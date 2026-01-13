'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getSiteSettings() {
    if (!prisma) {
        return {
            id: 'default',
            seoTitle: 'ARİS VİA MEDIA | Premium Digital Agency',
            seoDescription: 'Estetiği teknolojiyle, lüksü inovasyonla harmanlayan unutulmaz dijital deneyimler.',
            logoUrl: null,
            favicon: null,
            globalCss: null
        }
    }

    try {
        let settings = await prisma.siteSettings.findFirst()

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    seoTitle: 'ARİS VİA MEDIA | Premium Digital Agency',
                    seoDescription: 'Estetiği teknolojiyle, lüksü inovasyonla harmanlayan unutulmaz dijital deneyimler.',
                }
            })
        }
        return settings
    } catch (error) {
        console.error("Failed to fetch settings:", error)
        return {
            id: 'default',
            seoTitle: 'ARİS VİA MEDIA | Premium Digital Agency',
            seoDescription: 'Estetiği teknolojiyle, lüksü inovasyonla harmanlayan unutulmaz dijital deneyimler.',
            logoUrl: null,
            favicon: null,
            globalCss: null
        }
    }
}

export async function updateSiteSettings(data: {
    seoTitle: string
    seoDescription: string
    logoUrl?: string
    favicon?: string
    globalCss?: string
}) {
    if (!prisma) {
        return { success: false, error: "Database not configured" }
    }

    try {
        const settings = await prisma.siteSettings.findFirst()
        if (!settings) throw new Error("Settings not found")

        const updated = await prisma.siteSettings.update({
            where: { id: settings.id },
            data
        })

        revalidatePath('/')
        return { success: true, data: updated }
    } catch (error) {
        console.error("Failed to update settings:", error)
        return { success: false, error: "Failed to update settings" }
    }
}
