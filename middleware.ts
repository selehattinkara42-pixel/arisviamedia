
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt, encrypt } from '@/lib/auth'

const rateLimitMap = new Map();

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const path = request.nextUrl.pathname;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 dakika

    // 1. Temizlik: Süresi geçmiş kayıtları sil (Memory leak önleme)
    if (Math.random() < 0.05) { // %5 ihtimalle temizlik yap
        for (const [key, data] of rateLimitMap.entries()) {
            if (now - data.startTime > windowMs) {
                rateLimitMap.delete(key);
            }
        }
    }

    // 2. Admin Rotaları için Güvenlik Kontrolleri
    if (path.startsWith('/admin')) {

        // A) Rate Limiting (Akıllı Sürüm)
        // Statik dosyaları (resim, css, js) hariç tut
        const isStaticAsset = path.match(/\.(.*)$/);

        if (!isStaticAsset) {
            let limit = 300; // Admin içi genel gezinme limiti (Yüksek tutuldu)

            if (path === '/admin/login') {
                if (request.method === 'POST') {
                    limit = 10; // Login denemesi (POST - Hack girişimi) -> ÇOK KATI
                } else {
                    limit = 60; // Login sayfasını görüntüleme (GET) -> NORMAL
                }
            }

            let rateData = rateLimitMap.get(ip);

            if (!rateData || now - rateData.startTime > windowMs) {
                rateData = { count: 0, startTime: now };
            }

            rateData.count++;
            rateLimitMap.set(ip, rateData);

            if (rateData.count > limit) {
                console.warn(`Rate Limit Engeli: IP=${ip}, Path=${path}, Count=${rateData.count}`);
                return new NextResponse(
                    JSON.stringify({ error: 'Çok fazla istek. Lütfen 1 dakika bekleyin.' }),
                    { status: 429, headers: { 'Content-Type': 'application/json' } }
                );
            }
        }

        // B) Oturum Kontrolü (Auth)
        const sessionCookie = request.cookies.get('admin_session')?.value;

        // Login sayfasına gidiyorsa
        if (path === '/admin/login') {
            if (sessionCookie) {
                try {
                    await decrypt(sessionCookie);
                    return NextResponse.redirect(new URL('/admin', request.url));
                } catch (e) {
                    // Token geçersiz, login sayfasında kal
                }
            }
            return NextResponse.next();
        }

        // Diğer admin sayfaları (Korumalı alan)
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            // Token kontrolü ve süresini uzatma (Sliding Expiration)
            const payload = await decrypt(sessionCookie);

            const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 dakika uzat (Süre artırıldı, admin rahat çalışsın)
            const newSession = await encrypt({ ...payload, expiresAt: expires });

            const response = NextResponse.next();

            response.cookies.set({
                name: 'admin_session',
                value: newSession,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                expires: expires
            });

            return response;

        } catch (error) {
            // Token bozuk veya süresi dolmuş
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin_session');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
}
