
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt, encrypt } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Admin rotalarını koru
    if (path.startsWith('/admin')) {
        const sessionCookie = request.cookies.get('admin_session')?.value

        // Login sayfasına gidiyorsa ve zaten oturum varsa admine yönlendir
        if (path === '/admin/login') {
            if (sessionCookie) {
                try {
                    await decrypt(sessionCookie)
                    return NextResponse.redirect(new URL('/admin', request.url))
                } catch (e) {
                    // Token geçersizse bir şey yapma, login sayfasını göster
                }
            }
            return NextResponse.next()
        }

        // Diğer admin sayfaları için oturum kontrolü
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        try {
            // Token'ı çöz ve süresini uzat (Sliding Expiration)
            const payload = await decrypt(sessionCookie)
            
            // Oturumu 30 dakika uzat
            const expires = new Date(Date.now() + 30 * 60 * 1000)
            const newSession = await encrypt({ ...payload, expiresAt: expires })

            const response = NextResponse.next()

            response.cookies.set({
                name: 'admin_session',
                value: newSession,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                expires: expires
            })

            return response

        } catch (error) {
            // Token bozuk veya süresi dolmuş
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
