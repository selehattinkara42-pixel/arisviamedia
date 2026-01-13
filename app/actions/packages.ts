'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type PackageData = {
    name: string
    price: number
    features: string[]
    badge?: string | null
    isVisible?: boolean
}

export async function getPackages() {
    if (!prisma) return []

    try {
        return await prisma.package.findMany({
            orderBy: { price: 'asc' }
        })
    } catch (error) {
        console.error("Failed to fetch packages:", error)
        return []
    }
}

export async function createPackage(data: PackageData) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok. Lütfen DATABASE_URL ayarını kontrol edin." }
    }

    try {
        const newPackage = await prisma.package.create({
            data: {
                name: data.name,
                price: data.price,
                features: data.features,
                badge: data.badge || null,
                isVisible: data.isVisible ?? true
            }
        })
        revalidatePath('/admin/packages')
        revalidatePath('/paketler')
        revalidatePath('/')
        return { success: true, data: newPackage }
    } catch (error) {
        console.error("Failed to create package:", error)
        return { success: false, error: "Paket oluşturulamadı. Veritabanı hatası." }
    }
}

export async function updatePackage(id: number, data: Partial<PackageData>) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        const updated = await prisma.package.update({
            where: { id },
            data
        })
        revalidatePath('/admin/packages')
        revalidatePath('/paketler')
        revalidatePath('/')
        return { success: true, data: updated }
    } catch (error) {
        console.error("Failed to update package:", error)
        return { success: false, error: "Paket güncellenemedi. Veritabanı hatası." }
    }
}

export async function deletePackage(id: number) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        await prisma.package.delete({
            where: { id }
        })
        revalidatePath('/admin/packages')
        revalidatePath('/paketler')
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error("Failed to delete package:", error)
        return { success: false, error: "Paket silinemedi. Veritabanı hatası." }
    }
}
