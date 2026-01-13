'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Default cards for when database is empty or not connected
const defaultCards = [
    { id: 1, title: "Hızlı Büyüme", description: "Dijital stratejilerle hızlı sonuçlar", icon: "Zap", iconColor: "#D4AF37", order: 0, isVisible: true },
    { id: 2, title: "Güvenilir Mimari", description: "Ölçeklenebilir altyapı çözümleri", icon: "Shield", iconColor: "#22D3EE", order: 1, isVisible: true },
    { id: 3, title: "Premium Sonuçlar", description: "Ölçülebilir başarı metrikleri", icon: "TrendingUp", iconColor: "#8B5CF6", order: 2, isVisible: true },
]

export async function getHeroCards() {
    if (!prisma) return defaultCards

    try {
        const cards = await prisma.heroCard.findMany({
            where: { isVisible: true },
            orderBy: { order: 'asc' }
        })
        return cards.length > 0 ? cards : defaultCards
    } catch (error) {
        console.error("Failed to fetch hero cards:", error)
        return defaultCards
    }
}

export async function getAllHeroCards() {
    if (!prisma) return defaultCards

    try {
        const cards = await prisma.heroCard.findMany({
            orderBy: { order: 'asc' }
        })
        return cards.length > 0 ? cards : defaultCards
    } catch (error) {
        console.error("Failed to fetch all hero cards:", error)
        return defaultCards
    }
}

export async function createHeroCard(data: {
    title: string
    description?: string
    icon: string
    iconColor: string
}) {
    if (!prisma) return { success: false, error: "Database not configured" }

    try {
        // Get max order
        const maxOrder = await prisma.heroCard.aggregate({
            _max: { order: true }
        })

        const card = await prisma.heroCard.create({
            data: {
                ...data,
                order: (maxOrder._max.order ?? -1) + 1
            }
        })

        revalidatePath('/')
        revalidatePath('/admin/hero-cards')
        return { success: true, data: card }
    } catch (error) {
        console.error("Failed to create hero card:", error)
        return { success: false, error: "Failed to create card" }
    }
}

export async function updateHeroCard(id: number, data: {
    title?: string
    description?: string
    icon?: string
    iconColor?: string
    isVisible?: boolean
    order?: number
}) {
    if (!prisma) return { success: false, error: "Database not configured" }

    try {
        const card = await prisma.heroCard.update({
            where: { id },
            data
        })

        revalidatePath('/')
        revalidatePath('/admin/hero-cards')
        return { success: true, data: card }
    } catch (error) {
        console.error("Failed to update hero card:", error)
        return { success: false, error: "Failed to update card" }
    }
}

export async function deleteHeroCard(id: number) {
    if (!prisma) return { success: false, error: "Database not configured" }

    try {
        await prisma.heroCard.delete({
            where: { id }
        })

        revalidatePath('/')
        revalidatePath('/admin/hero-cards')
        return { success: true }
    } catch (error) {
        console.error("Failed to delete hero card:", error)
        return { success: false, error: "Failed to delete card" }
    }
}

export async function reorderHeroCards(orderedIds: number[]) {
    if (!prisma) return { success: false, error: "Database not configured" }

    try {
        // Update each card's order based on its position in the array
        await Promise.all(
            orderedIds.map((id, index) =>
                prisma!.heroCard.update({
                    where: { id },
                    data: { order: index }
                })
            )
        )

        revalidatePath('/')
        revalidatePath('/admin/hero-cards')
        return { success: true }
    } catch (error) {
        console.error("Failed to reorder hero cards:", error)
        return { success: false, error: "Failed to reorder cards" }
    }
}
