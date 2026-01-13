import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, unlink, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Chunked upload for large files (up to 500MB)
const CHUNK_SIZE = 5 * 1024 * 1024 // 5MB chunks

interface ChunkInfo {
    chunkIndex: number
    totalChunks: number
    uploadId: string
    filename: string
    folder: string
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const chunk = formData.get('chunk') as File
        const chunkIndex = parseInt(formData.get('chunkIndex') as string)
        const totalChunks = parseInt(formData.get('totalChunks') as string)
        const uploadId = formData.get('uploadId') as string
        const filename = formData.get('filename') as string
        const folder = formData.get('folder') as string || 'videos'

        if (!chunk || isNaN(chunkIndex) || isNaN(totalChunks) || !uploadId || !filename) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Create temp directory for chunks
        const tempDir = path.join(process.cwd(), 'public', 'uploads', 'temp', uploadId)
        if (!existsSync(tempDir)) {
            await mkdir(tempDir, { recursive: true })
        }

        // Save chunk
        const bytes = await chunk.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const chunkPath = path.join(tempDir, `chunk-${chunkIndex.toString().padStart(5, '0')}`)
        await writeFile(chunkPath, buffer)

        // Check if all chunks are uploaded
        const uploadedChunks = await readdir(tempDir)

        if (uploadedChunks.length === totalChunks) {
            // All chunks received - merge them
            const timestamp = Date.now()
            const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
            const finalFilename = `${timestamp}-${safeFilename}`

            const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
            if (!existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true })
            }

            const finalPath = path.join(uploadDir, finalFilename)

            // Read and merge all chunks in order
            const sortedChunks = uploadedChunks.sort()
            const chunks: Buffer[] = []

            for (const chunkFile of sortedChunks) {
                const chunkPath = path.join(tempDir, chunkFile)
                const chunkData = await import('fs').then(fs =>
                    new Promise<Buffer>((resolve, reject) => {
                        fs.readFile(chunkPath, (err, data) => {
                            if (err) reject(err)
                            else resolve(data)
                        })
                    })
                )
                chunks.push(chunkData)
            }

            // Write merged file
            const mergedBuffer = Buffer.concat(chunks)
            await writeFile(finalPath, mergedBuffer)

            // Clean up temp directory
            for (const chunkFile of sortedChunks) {
                await unlink(path.join(tempDir, chunkFile))
            }
            await import('fs/promises').then(fs => fs.rmdir(tempDir))

            const publicUrl = `/uploads/${folder}/${finalFilename}`

            return NextResponse.json({
                success: true,
                complete: true,
                url: publicUrl,
                filename: finalFilename,
                size: mergedBuffer.length
            })
        }

        // Chunk received but not complete yet
        return NextResponse.json({
            success: true,
            complete: false,
            chunksReceived: uploadedChunks.length,
            totalChunks
        })

    } catch (error) {
        console.error('Chunked upload error:', error)
        return NextResponse.json({ error: 'Chunked upload failed' }, { status: 500 })
    }
}
