
'use server'

import { list, del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export type BlobFile = {
    url: string
    pathname: string
    size: number
    uploadedAt: Date
}

export async function getMediaFiles(cursor?: string): Promise<{ blobs: BlobFile[], hasMore: boolean, cursor?: string }> {
    try {
        const { blobs, hasMore, cursor: nextCursor } = await list({
            limit: 20,
            cursor,
        })
        return { blobs, hasMore, cursor: nextCursor }
    } catch (error) {
        console.error("Media list error:", error)
        return { blobs: [], hasMore: false }
    }
}

export async function deleteMediaFile(url: string) {
    try {
        await del(url)
        revalidatePath('/admin/media')
        return { success: true }
    } catch (error) {
        console.error("Delete media error:", error)
        return { success: false, error: "Dosya silinemedi" }
    }
}
