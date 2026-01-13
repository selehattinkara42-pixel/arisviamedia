'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Loader2, FileImage, FileVideo, File } from 'lucide-react'
import { upload } from '@vercel/blob/client'

interface FileUploadProps {
    onUpload: (url: string) => void
    folder?: 'images' | 'videos' | 'logos' | 'documents'
    accept?: string
    maxSize?: number // in MB
    currentUrl?: string
    label?: string
    className?: string
}

export default function FileUpload({
    onUpload,
    folder = 'images',
    accept = 'image/*',
    maxSize = 250,
    currentUrl,
    label = 'Dosya Yükle',
    className = ''
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [preview, setPreview] = useState<string | null>(currentUrl || null)
    const [fileType, setFileType] = useState<'image' | 'video' | 'other'>('image') // Track file type
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Determine initial file type from currentUrl if present
    const getFileTypeFromUrl = (url: string): 'image' | 'video' | 'other' => {
        const lowered = url.toLowerCase()
        if (lowered.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i)) return 'image'
        if (lowered.match(/\.(mp4|webm|mov|avi|mkv)(\?|$)/i)) return 'video'
        // Default to image for blob URLs without extension
        return 'image'
    }

    const uploadFile = async (file: File) => {
        setError(null)
        setUploading(true)
        setProgress(0)

        // Detect file type from MIME
        const detectedType: 'image' | 'video' | 'other' =
            file.type.startsWith('image/') ? 'image' :
                file.type.startsWith('video/') ? 'video' : 'other'

        setFileType(detectedType)

        if (file.size > maxSize * 1024 * 1024) {
            setError(`Dosya boyutu ${maxSize}MB'dan büyük olamaz.`)
            setUploading(false)
            return
        }

        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                onUploadProgress: (progressEvent) => {
                    setProgress(progressEvent.percentage)
                }
            })

            setProgress(100)
            setPreview(newBlob.url)
            onUpload(newBlob.url)
            setUploading(false)

        } catch (err) {
            console.error(err)
            setError('Yükleme başarısız oldu. Lütfen tekrar deneyin.')
            setUploading(false)
        }
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) uploadFile(file)
    }, [folder])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) uploadFile(file)
    }

    const clearFile = async () => {
        // Delete blob from storage if it's a blob URL
        if (preview && preview.includes('blob.vercel-storage.com')) {
            try {
                await fetch('/api/upload/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: preview })
                })
            } catch (err) {
                console.error('Failed to delete blob:', err)
            }
        }

        setPreview(null)
        setFileType('image')
        onUpload('')
        if (inputRef.current) inputRef.current.value = ''
    }

    const getFileIcon = () => {
        if (fileType === 'video') return <FileVideo className="w-8 h-8" />
        if (fileType === 'image') return <FileImage className="w-8 h-8" />
        return <File className="w-8 h-8" />
    }

    // Determine display type based on tracked fileType
    const showAsImage = preview && fileType === 'image'
    const showAsVideo = preview && fileType === 'video'

    return (
        <div className={`space-y-2 ${className}`}>
            {label && <label className="block text-sm text-white/60">{label}</label>}

            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl transition-all overflow-hidden
                    ${dragOver ? 'border-primary-gold bg-primary-gold/10' : 'border-white/10 hover:border-white/30'}
                    ${preview ? 'p-0' : 'p-6'}
                `}
            >
                {preview ? (
                    <div className="relative group">
                        {showAsImage && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                            />
                        )}
                        {showAsVideo && (
                            <video
                                src={preview}
                                className="w-full h-48 object-cover"
                                controls
                            />
                        )}
                        {!showAsImage && !showAsVideo && (
                            <div className="flex items-center justify-center h-32 bg-white/5">
                                {getFileIcon()}
                                <span className="ml-3 text-sm text-white/60 truncate max-w-[200px]">{preview.split('/').pop()}</span>
                            </div>
                        )}

                        {/* Overlay buttons */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="px-4 py-2 bg-white/10 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors"
                            >
                                Değiştir
                            </button>
                            <button
                                type="button"
                                onClick={clearFile}
                                className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="cursor-pointer text-center"
                    >
                        {uploading ? (
                            <div className="space-y-3">
                                <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary-gold" />
                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="h-full bg-primary-gold transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-white/40">%{Math.round(progress)} yüklendi...</p>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 mx-auto text-white/30 mb-3" />
                                <p className="text-sm text-white/60">
                                    Dosyayı sürükleyin veya <span className="text-primary-gold">seçin</span>
                                </p>
                                <p className="text-xs text-white/30 mt-1">
                                    Maksimum {maxSize}MB
                                </p>
                            </>
                        )}
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    className="hidden"
                />
            </div>

            {error && (
                <p className="text-red-400 text-xs">{error}</p>
            )}
        </div>
    )
}
