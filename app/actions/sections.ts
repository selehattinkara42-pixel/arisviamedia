'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const defaultSections = [
    { id: 'hero', name: 'Giriş (Hero)', order: 0, isVisible: true },
    { id: 'services', name: 'Hizmetler', order: 1, isVisible: true },
    { id: 'portfolio', name: 'Portfolyo', order: 2, isVisible: true },
    { id: 'testimonials', name: 'Referanslar', order: 3, isVisible: true },
    { id: 'packages', name: 'Paketler', order: 4, isVisible: true },
    { id: 'contact', name: 'İletişim', order: 5, isVisible: true },
]

export async function getSections() {
    if (!prisma) return defaultSections

    try {
        const sections = await prisma.sectionConfig.findMany({
            orderBy: { order: 'asc' }
        })

        if (sections.length === 0) {
            await prisma.sectionConfig.createMany({
                data: defaultSections,
                skipDuplicates: true
            })

            return await prisma.sectionConfig.findMany({ orderBy: { order: 'asc' } })
        }

        return sections
    } catch (error) {
        return defaultSections
    }
}

export async function toggleSection(id: string, isVisible: boolean) {
    if (!prisma) return { success: false, error: "Veritabanı bağlantısı yok" }

    try {
        await prisma.sectionConfig.update({
            where: { id },
            data: { isVisible }
        })
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

export async function updateSectionOrder(sections: { id: string, order: number }[]) {
    if (!prisma) return { success: false, error: "Veritabanı bağlantısı yok" }

    try {
        await prisma.$transaction(
            sections.map(s => prisma!.sectionConfig.update({
                where: { id: s.id },
                data: { order: s.order }
            }))
        )
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}
