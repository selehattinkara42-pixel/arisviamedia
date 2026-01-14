'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type PortfolioData = {
    title: string
    description: string
    mediaUrl: string
    coverUrl?: string
    category: string
    order?: number
    isVisible?: boolean
}

export async function getPortfolioItems() {
    if (!prisma) {
        return []
    }

    try {
        const items = await prisma.portfolio.findMany({
            orderBy: { order: 'asc' }
        })
        return items
    } catch (error) {
        console.error("Failed to fetch portfolio items:", error)
        return []
    }
}

export async function createPortfolioItem(data: PortfolioData) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok. Lütfen DATABASE_URL ayarını kontrol edin." }
    }

    try {
        const newItem = await prisma.portfolio.create({
            data: {
                title: data.title,
                description: data.description,
                mediaUrl: data.mediaUrl,
                coverUrl: data.coverUrl || null,
                category: data.category,
                order: data.order ?? 0,
                isVisible: data.isVisible ?? true
            }
        })
        revalidatePath('/admin/portfolio')
        revalidatePath('/portfolyo')
        revalidatePath('/')
        return { success: true, data: newItem }
    } catch (error) {
        console.error("Failed to create portfolio item:", error)
        return { success: false, error: "Proje oluşturulamadı. Veritabanı hatası." }
    }
}

export async function updatePortfolioItem(id: number, data: Partial<PortfolioData>) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok. Lütfen DATABASE_URL ayarını kontrol edin." }
    }

    try {
        const updatedItem = await prisma.portfolio.update({
            where: { id },
            data
        })
        revalidatePath('/admin/portfolio')
        revalidatePath('/portfolyo')
        revalidatePath('/')
        return { success: true, data: updatedItem }
    } catch (error) {
        console.error("Failed to update portfolio item:", error)
        return { success: false, error: "Proje güncellenemedi. Veritabanı hatası." }
    }
}

export async function deletePortfolioItem(id: number) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        await prisma.portfolio.delete({
            where: { id }
        })
        revalidatePath('/admin/portfolio')
        revalidatePath('/portfolyo')
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error("Failed to delete portfolio item:", error)
        return { success: false, error: "Proje silinemedi. Veritabanı hatası." }
    }
}
