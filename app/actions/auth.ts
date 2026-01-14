'use server'

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { encrypt } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

const DEFAULT_PASS = "1453AVM"

export async function login(formData: FormData) {
    const password = formData.get('password') as string

    if (!prisma) return { error: "Veritabanı bağlantısı yok." }

    // Ayarları çek
    let settings = await prisma.siteSettings.findFirst()

    // Eğer ayar hiç yoksa oluştur
    if (!settings) {
        // Create default settings with hashed default password
        const hashedPassword = await bcrypt.hash(DEFAULT_PASS, 10)
        settings = await prisma.siteSettings.create({
            data: {
                siteName: "Aris Via Media",
                adminPassword: hashedPassword
            }
        })
    }

    // Şifre kontrolü
    let isValid = false

    if (!settings.adminPassword) {
        // Eğer DB'de şifre yoksa (eski kayıt), default şifreyi kontrol et
        if (password === DEFAULT_PASS) {
            // Şifreyi hashleyip kaydet (Migration on the fly)
            const hashedPassword = await bcrypt.hash(DEFAULT_PASS, 10)
            await prisma.siteSettings.update({
                where: { id: settings.id },
                data: { adminPassword: hashedPassword }
            })
            isValid = true
        }
    } else {
        // DB'deki hash ile karşılaştır
        isValid = await bcrypt.compare(password, settings.adminPassword)
    }

    if (!isValid) {
        return { error: "Hatali şifre!" }
    }

    // Başarılı giriş: Oturum oluştur (3 dakika geçerli)
    const expires = new Date(Date.now() + 3 * 60 * 1000)
    const session = await encrypt({ admin: true, expiresAt: expires })

    const cookieStore = await cookies()
    cookieStore.set('admin_session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    })

    redirect('/admin')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    redirect('/admin/login')
}

export async function changePassword(currentPass: string, newPass: string) {
    if (!prisma) return { success: false, error: "Veritabanı hatası" }

    const settings = await prisma.siteSettings.findFirst()
    if (!settings || !settings.adminPassword) return { success: false, error: "Ayarlar bulunamadı" }

    // Eski şifreyi kontrol et
    const isValid = await bcrypt.compare(currentPass, settings.adminPassword)
    if (!isValid) {
        return { success: false, error: "Mevcut şifre yanlış" }
    }

    // Yeni şifreyi hashle ve kaydet
    const hashedPassword = await bcrypt.hash(newPass, 10)
    await prisma.siteSettings.update({
        where: { id: settings.id },
        data: { adminPassword: hashedPassword }
    })

    return { success: true }
}
