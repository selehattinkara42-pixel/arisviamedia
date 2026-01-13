import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Route segment config for handling larger request bodies
export const dynamic = 'force-dynamic'

// Maximum file size: 50MB for regular uploads
const MAX_FILE_SIZE = 50 * 1024 * 1024

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const folder = formData.get('folder') as string || 'images'

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({
                error: 'File too large. Maximum size is 50MB. Use chunked upload for larger files.'
            }, { status: 400 })
        }

        // Validate folder
        const allowedFolders = ['images', 'videos', 'logos', 'documents']
        if (!allowedFolders.includes(folder)) {
            return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
        }

        // Create unique filename
        const timestamp = Date.now()
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const filename = `${timestamp}-${originalName}`

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // Write file
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const filePath = path.join(uploadDir, filename)
        await writeFile(filePath, buffer)

        // Return public URL
        const publicUrl = `/uploads/${folder}/${filename}`

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename,
            size: file.size,
            type: file.type
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
