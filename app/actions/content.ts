'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getDynamicContent() {
    if (!prisma) return {}

    try {
        const content = await prisma.dynamicContent.findMany()
        const contentMap = content.reduce((acc, curr) => {
            acc[curr.key] = curr.value
            return acc
        }, {} as Record<string, string>)
        return contentMap
    } catch (error) {
        console.error("Failed to fetch content:", error)
        return {}
    }
}

export async function updateContent(key: string, value: string) {
    if (!prisma) return { success: false, error: "Veritabanı bağlantısı yok" }

    try {
        await prisma.dynamicContent.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        })
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error("Failed to update content:", error)
        return { success: false, error: "Güncelleme başarısız" }
    }
}
