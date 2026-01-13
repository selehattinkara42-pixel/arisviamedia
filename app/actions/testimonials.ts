'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type TestimonialData = {
    name: string
    role: string
    company: string
    content: string
    avatarUrl?: string | null
    rating?: number
    isVisible?: boolean
    order?: number
}

export async function getTestimonials() {
    if (!prisma) return []

    try {
        return await prisma.testimonial.findMany({ orderBy: { order: 'asc' } })
    } catch (error) {
        console.error("Failed to fetch testimonials:", error)
        return []
    }
}

export async function createTestimonial(data: TestimonialData) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok. Lütfen DATABASE_URL ayarını kontrol edin." }
    }

    try {
        const item = await prisma.testimonial.create({
            data: {
                name: data.name,
                role: data.role,
                company: data.company,
                content: data.content,
                avatarUrl: data.avatarUrl || null,
                rating: data.rating ?? 5,
                isVisible: data.isVisible ?? true,
                order: data.order ?? 0
            }
        })
        revalidatePath('/admin/testimonials')
        revalidatePath('/referanslar')
        revalidatePath('/')
        return { success: true, data: item }
    } catch (error) {
        console.error("Failed to create testimonial:", error)
        return { success: false, error: "Referans oluşturulamadı. Veritabanı hatası." }
    }
}

export async function updateTestimonial(id: number, data: Partial<TestimonialData>) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        const item = await prisma.testimonial.update({ where: { id }, data })
        revalidatePath('/admin/testimonials')
        revalidatePath('/referanslar')
        revalidatePath('/')
        return { success: true, data: item }
    } catch (error) {
        console.error("Failed to update testimonial:", error)
        return { success: false, error: "Referans güncellenemedi. Veritabanı hatası." }
    }
}

export async function deleteTestimonial(id: number) {
    if (!prisma) {
        return { success: false, error: "Veritabanı bağlantısı yok." }
    }

    try {
        await prisma.testimonial.delete({ where: { id } })
        revalidatePath('/admin/testimonials')
        revalidatePath('/referanslar')
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error("Failed to delete testimonial:", error)
        return { success: false, error: "Referans silinemedi. Veritabanı hatası." }
    }
}
