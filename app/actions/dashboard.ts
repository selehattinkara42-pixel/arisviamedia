
'use server'

import { prisma } from "@/lib/prisma"

export type DashboardStats = {
    counts: {
        projects: number
        testimonials: number
        packages: number
        messages: number
        unreadMessages: number
    },
    recentMessages: {
        id: number
        name: string
        email: string
        subject: string | null
        createdAt: Date
        status: string
    }[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
    if (!prisma) {
        throw new Error("Veritabanı bağlantısı yok")
    }

    try {
        // İstatistikleri paralel çek (daha hızlı)
        const [
            projects,
            testimonials,
            packages,
            messages,
            unreadMessages,
            recentMessages
        ] = await Promise.all([
            prisma.portfolio.count(),
            prisma.testimonial.count(),
            prisma.package.count(),
            prisma.contactSubmission.count(),
            prisma.contactSubmission.count({ where: { status: 'UNREAD' } }),
            prisma.contactSubmission.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    subject: true,
                    createdAt: true,
                    status: true
                }
            })
        ])

        return {
            counts: {
                projects,
                testimonials,
                packages,
                messages,
                unreadMessages
            },
            recentMessages
        }

    } catch (error) {
        console.error("Dashboard stats error:", error)
        return {
            counts: { projects: 0, testimonials: 0, packages: 0, messages: 0, unreadMessages: 0 },
            recentMessages: []
        }
    }
}
