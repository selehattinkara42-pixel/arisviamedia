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
        return { success: false, error: "Veritabanı bağlantısı yok. Lütfen yöneticiyle iletişime geçin." }
    }

    try {
        // Validate required fields
        if (!data.name) {
            return { success: false, error: "Marka adı zorunludur." }
        }

        const newRef = await prisma.reference.create({
            data: {
                name: data.name,
                // Ensure null for empty strings or undefined
                logoUrl: data.logoUrl || null,
                websiteUrl: data.websiteUrl || null,
                description: data.description || null,
                category: data.category || 'Marka',
                // Ensure number for order
                order: Number(data.order) || 0,
                isVisible: data.isVisible ?? true
            }
        })

        revalidatePath('/admin/references')
        revalidatePath('/referanslar')
        revalidatePath('/')

        return { success: true, data: newRef }
    } catch (error: any) {
        console.error("Failed to create reference detailed error:", error)
        // Return detailed error message to client for debugging
        return {
            success: false,
            error: `Referans oluşturulamadı: ${error.message || 'Bilinmeyen veritabanı hatası'}`
        }
    }
}

export async function updateReference(id: number, data: Partial<ReferenceData>) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        const updated = await prisma.reference.update({
            where: { id },
            data: {
                ...data,
                order: data.order !== undefined ? Number(data.order) : undefined
            }
        })

        revalidatePath('/admin/references')
        revalidatePath('/referanslar')
        revalidatePath('/')

        return { success: true, data: updated }
    } catch (error: any) {
        console.error("Failed to update reference:", error)
        return {
            success: false,
            error: `Referans güncellenemedi: ${error.message}`
        }
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
    } catch (error: any) {
        console.error("Failed to delete reference:", error)
        return {
            success: false,
            error: `Referans silinemedi: ${error.message}`
        }
    }
}
