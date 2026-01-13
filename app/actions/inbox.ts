'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getInboxMessages() {
    if (!prisma) return []

    try {
        return await prisma.contactSubmission.findMany({
            orderBy: { createdAt: 'desc' }
        })
    } catch (error) {
        return []
    }
}

export async function markAsRead(id: number) {
    if (!prisma) return { success: false, error: "Veritabanı bağlantısı yok" }

    try {
        await prisma.contactSubmission.update({
            where: { id },
            data: { status: 'READ' }
        })
        revalidatePath('/admin/inbox')
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

export async function deleteMessage(id: number) {
    if (!prisma) return { success: false, error: "Veritabanı bağlantısı yok" }

    try {
        await prisma.contactSubmission.delete({ where: { id } })
        revalidatePath('/admin/inbox')
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}
