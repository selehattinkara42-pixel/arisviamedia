import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt, encrypt } from '@/lib/auth'

const rateLimitMap = new Map();

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const path = request.nextUrl.pathname;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 dakika

    // Temizlik: Süresi geçmiş kayıtları sil (Memory leak önleme)
    // Her 100 isteğin 1'inde temizlik yap
    if (Math.random() < 0.01) {
        for (const [key, data] of rateLimitMap.entries()) {
            if (now - data.startTime > windowMs) {
                rateLimitMap.delete(key);
            }
        }
    }

    // Rate Limiting Logic for Admin Routes
    if (path.startsWith('/admin')) {
        const limit = path === '/admin/login' ? 5 : 120; // Login: 5 deneme, Diğer: 120 istek

        let rateData = rateLimitMap.get(ip);

        if (!rateData || now - rateData.startTime > windowMs) {
            rateData = { count: 0, startTime: now };
        }

        rateData.count++;
        rateLimitMap.set(ip, rateData);

        if (rateData.count > limit) {
            return new NextResponse('Çok fazla istek gönderdiniz. Lütfen 1 dakika bekleyin.', { status: 429 });
        }
    }

    // Admin rotalarını koru (Mevcut Auth Logic)
    if (path.startsWith('/admin')) {
        // ... (Bu kısım aynı kalacak, sadece yukarıdaki rate limit eklendi)
        // Login sayfasına gidiyorsa ve zaten oturum varsa admine at
        const sessionCookie = request.cookies.get('admin_session')?.value
        // ... (Geri kalan kod buraya aşağıya devam edecek şekilde kalsın)


        if (path === '/admin/login') {
            if (sessionCookie) {
                // Token geçerli mi kontrol et
                try {
                    await decrypt(sessionCookie)
                    return NextResponse.redirect(new URL('/admin', request.url))
                } catch (e) {
                    // Geçersizse devam et (login sayfasını göster)
                }
            }
            return NextResponse.next()
        }

        // Diğer admin sayfaları için oturum kontrolü
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        try {
            // Token'ı çöz ve süresini kontrol et
            const payload = await decrypt(sessionCookie)

            // Sliding Expiration: Kullanıcı admin paneldeyken süreyi uzat
            // Yeni bir token oluştur (3 dakika daha geçerli)
            const expires = new Date(Date.now() + 3 * 60 * 1000)
            const newSession = await encrypt({ ...payload, expiresAt: expires })

            const response = NextResponse.next()

            // Cookie'yi güncelle
            response.cookies.set({
                name: 'admin_session',
                value: newSession,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                expires: expires // Browser'a da süreyi bildir
            })

            return response

        } catch (error) {
            // Token geçersiz veya süresi dolmuş
            const response = NextResponse.redirect(new URL('/admin/login', request.url))
            response.cookies.delete('admin_session')
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
