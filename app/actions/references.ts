'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type ReferenceData = {
    name: string
    logoUrl?: string | null
    websiteUrl?: string | null
    description?: string | null
    category?: string
    order?: number
    isVisible?: boolean
}

export async function getReferences() {
    if (!prisma) return []

    try {
        const refs = await prisma.reference.findMany({
            orderBy: { order: 'asc' }
        })
        return refs
    } catch (error) {
        console.error("Failed to fetch references:", error)
        return []
    }
}

export async function getPublicReferences() {
    if (!prisma) return []

    try {
        const refs = await prisma.reference.findMany({
            where: { isVisible: true },
            orderBy: { order: 'asc' }
        })
        return refs
    } catch (error) {
        console.error("Failed to fetch public references:", error)
        return []
    }
}

export async function createReference(data: ReferenceData) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        const newRef = await prisma.reference.create({
            data: {
                name: data.name,
                logoUrl: data.logoUrl || null,
                websiteUrl: data.websiteUrl || null,
                description: data.description || null,
                category: data.category || 'Marka',
                order: data.order || 0,
                isVisible: data.isVisible ?? true
            }
        })
        revalidatePath('/admin/references')
        revalidatePath('/referanslar')
        revalidatePath('/')
        return { success: true, data: newRef }
    } catch (error) {
        console.error("Failed to create reference:", error)
        return { success: false, error: "Referans oluşturulamadı." }
    }
}

export async function updateReference(id: number, data: Partial<ReferenceData>) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        const updated = await prisma.reference.update({
            where: { id },
            data
        })
        revalidatePath('/admin/references')
        revalidatePath('/referanslar')
        revalidatePath('/')
        return { success: true, data: updated }
    } catch (error) {
        console.error("Failed to update reference:", error)
        return { success: false, error: "Referans güncellenemedi." }
    }
}

export async function deleteReference(id: number) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        await prisma.reference.delete({
            where: { id }
        })
        revalidatePath('/admin/references')
        revalidatePath('/referanslar')
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error("Failed to delete reference:", error)
        return { success: false, error: "Referans silinemedi." }
    }
}
