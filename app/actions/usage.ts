
'use server'

import { prisma } from "@/lib/prisma"
import { list } from "@vercel/blob"

export type SystemUsage = {
    database: {
        projects: number
        references: number
        packages: number // Dinamik paketler eklenirse
        contentItems: number
        totalRows: number
    },
    storage: {
        totalFiles: number
        totalSizeBytes: number
        totalSizeMB: string
    }
}

export async function getSystemUsage(): Promise<SystemUsage> {
    if (!prisma) {
        throw new Error("Veritabanı bağlantısı yok")
    }

    try {
        // 1. Veritabanı İstatistikleri
        const projectsCount = await prisma.portfolioItem.count()
        const referencesCount = await prisma.reference.count()
        const contentCount = await prisma.pageContent.count()

        // Settings de bir satır sayılır
        const settingsCount = await prisma.siteSettings.count()

        const totalRows = projectsCount + referencesCount + contentCount + settingsCount

        // 2. Vercel Blob (Dosya Depolama) İstatistikleri
        // Blob'daki tüm dosyaları listele (limit 1000, pagination gerekirse eklenebilir ama şu an için yeterli)
        let blobFilesCount = 0
        let blobTotalSize = 0

        try {
            const { blobs } = await list({ limit: 1000 })
            blobFilesCount = blobs.length
            blobTotalSize = blobs.reduce((acc, blob) => acc + blob.size, 0)
        } catch (e) {
            console.error("Blob list error:", e)
            // Blob hatası olursa 0 dön, arayüzü bozma
        }

        const totalSizeMB = (blobTotalSize / (1024 * 1024)).toFixed(2)

        return {
            database: {
                projects: projectsCount,
                references: referencesCount,
                packages: 0, // Şimdilik statik veya ayrı tablosu yoksa 0
                contentItems: contentCount,
                totalRows
            },
            storage: {
                totalFiles: blobFilesCount,
                totalSizeBytes: blobTotalSize,
                totalSizeMB
            }
        }

    } catch (error) {
        console.error("Usage stats error:", error)
        return {
            database: { projects: 0, references: 0, packages: 0, contentItems: 0, totalRows: 0 },
            storage: { totalFiles: 0, totalSizeBytes: 0, totalSizeMB: "0.00" }
        }
    }
}
