import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

// Route segment config for handling larger request bodies
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const filename = searchParams.get('filename')

        if (filename && request.body) {
            // Vercel Blob Upload
            const blob = await put(filename, request.body, {
                access: 'public',
            })

            return NextResponse.json({
                success: true,
                url: blob.url,
                filename: filename,
            })
        } else {
            // Form Data Upload (Fallback)
            const formData = await request.formData()
            const file = formData.get('file') as File
            const folder = formData.get('folder') as string || 'uploads'

            if (!file) {
                return NextResponse.json({ error: 'No file provided' }, { status: 400 })
            }

            const blob = await put(`${folder}/${file.name}`, file, {
                access: 'public',
            })

            return NextResponse.json({
                success: true,
                url: blob.url,
                filename: file.name,
                size: file.size,
                type: file.type
            })
        }

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
