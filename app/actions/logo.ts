'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const defaultLogoConfig = {
    width: 150,
    height: 50,
    x: 20,
    y: 20,
    visibility: ['home']
}

export async function getLogoConfig() {
    if (!prisma) return defaultLogoConfig

    try {
        let settings = await prisma.siteSettings.findFirst({
            include: { logoConfig: true }
        })

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    logoConfig: {
                        create: defaultLogoConfig
                    }
                },
                include: { logoConfig: true }
            })
        }

        if (!settings.logoConfig) {
            const newConfig = await prisma.logoConfig.create({
                data: {
                    settingsId: settings.id,
                    ...defaultLogoConfig
                }
            })
            return newConfig
        }

        return settings.logoConfig
    } catch (error) {
        console.error("Failed to fetch logo config:", error)
        return defaultLogoConfig
    }
}

export async function updateLogoConfig(data: {
    width: number,
    height: number,
    x: number,
    y: number,
    visibility: string[]
}) {
    if (!prisma) return { success: false, error: "Veritabanı bağlantısı yok" }

    try {
        const settings = await prisma.siteSettings.findFirst()

        if (!settings) throw new Error("Site settings not found")

        await prisma.logoConfig.update({
            where: { settingsId: settings.id },
            data: {
                width: data.width,
                height: data.height,
                x: data.x,
                y: data.y,
                visibility: data.visibility
            }
        })

        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error("Failed to update logo config:", error)
        return { success: false, error: "Ayarlar güncellenemedi" }
    }
}
