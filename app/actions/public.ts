'use server'

import { prisma } from "@/lib/prisma"

export async function getPublicLogoConfig() {
    if (!prisma) return null
    try {
        const settings = await prisma.siteSettings.findFirst({
            include: { logoConfig: true }
        })
        return settings?.logoConfig || null
    } catch (error) {
        return null
    }
}

export async function getPublicSections() {
    if (!prisma) return []
    try {
        return await prisma.sectionConfig.findMany({
            where: { isVisible: true },
            orderBy: { order: 'asc' }
        })
    } catch (error) {
        return []
    }
}

export async function getPublicPortfolio() {
    if (!prisma) return []
    try {
        return await prisma.portfolio.findMany({
            where: { isVisible: true },
            orderBy: { order: 'asc' },
            take: 6
        })
    } catch (error) {
        return []
    }
}

export async function getPublicTestimonials() {
    if (!prisma) return []
    try {
        return await prisma.testimonial.findMany({
            where: { isVisible: true },
            orderBy: { order: 'asc' }
        })
    } catch (error) {
        return []
    }
}

export async function getPublicPackages() {
    if (!prisma) return []
    try {
        return await prisma.package.findMany({
            where: { isVisible: true },
            orderBy: { price: 'asc' }
        })
    } catch (error) {
        return []
    }
}

export async function submitContactForm(data: any) {
    if (!prisma) return { success: false, error: 'Database not configured' }
    try {
        await prisma.contactSubmission.create({
            data: {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message
            }
        })
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}
