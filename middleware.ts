import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt, encrypt } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Admin rotalarını koru
    if (path.startsWith('/admin')) {
        // Login sayfasına gidiyorsa ve zaten oturum varsa admine at
        const sessionCookie = request.cookies.get('admin_session')?.value

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
