'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type HeroCardData = {
    id: number
    title: string
    description: string | null
    icon: string
    iconColor: string
    order: number
    isVisible: boolean
}

export async function getHeroCards() {
    if (!prisma) return []
    try {
        const cards = await prisma.heroCard.findMany({
            orderBy: { order: 'asc' },
            where: { isVisible: true }
        })
        return cards
    } catch (error) {
        console.error("Failed to fetch hero cards:", error)
        return []
    }
}

// Admin panel için tüm kartları (gizli olanlar dahil) getir
export async function getAllHeroCards() {
    if (!prisma) return []
    try {
        const cards = await prisma.heroCard.findMany({
            orderBy: { order: 'asc' }
        })
        return cards
    } catch (error) {
        return []
    }
}

export async function createHeroCard(data: Omit<HeroCardData, 'id'>) {
    if (!prisma) return { success: false, error: "DB connection failed" }
    try {
        const newCard = await prisma.heroCard.create({
            data: {
                title: data.title,
                description: data.description,
                icon: data.icon,
                iconColor: data.iconColor,
                order: data.order,
                isVisible: data.isVisible
            }
        })
        revalidatePath('/')
        return { success: true, data: newCard }
    } catch (error) {
        return { success: false, error: "Failed to create card" }
    }
}

export async function updateHeroCard(id: number, data: Partial<HeroCardData>) {
    if (!prisma) return { success: false, error: "DB connection failed" }
    try {
        const updated = await prisma.heroCard.update({
            where: { id },
            data
        })
        revalidatePath('/')
        return { success: true, data: updated }
    } catch (error) {
        return { success: false, error: "Failed to update card" }
    }
}

export async function deleteHeroCard(id: number) {
    if (!prisma) return { success: false, error: "DB connection failed" }
    try {
        await prisma.heroCard.delete({ where: { id } })
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete card" }
    }
}

// Reset to defaults
export async function seedHeroCards() {
    if (!prisma) return { success: false }

    // Check if any exists
    const count = await prisma.heroCard.count()
    if (count > 0) return { success: true, message: "Cards already exist" }

    const defaults = [
        { title: "Hızlı Büyüme", description: "Dijital stratejilerle hızlı sonuçlar", icon: "Zap", iconColor: "#D4AF37", order: 0, isVisible: true },
        { title: "Güvenilir Mimari", description: "Ölçeklenebilir altyapı çözümleri", icon: "Shield", iconColor: "#22D3EE", order: 1, isVisible: true },
        { title: "Premium Sonuçlar", description: "Ölçülebilir başarı metrikleri", icon: "TrendingUp", iconColor: "#8B5CF6", order: 2, isVisible: true },
    ]

    for (const card of defaults) {
        await prisma.heroCard.create({ data: card })
    }

    revalidatePath('/')
    return { success: true, message: "Seeded default cards" }
}
