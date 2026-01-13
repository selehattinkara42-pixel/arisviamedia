'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Check, Loader2, FileImage, FileVideo, File } from 'lucide-react'
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
    maxSize = 250, // Updated safe default for Blob
    currentUrl,
    label = 'Dosya Yükle',
    className = ''
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [preview, setPreview] = useState<string | null>(currentUrl || null)
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const uploadFile = async (file: File) => {
        setError(null)
        setUploading(true)
        setProgress(0)

        // Basic size check (though Blob handles large files, it's good UX to warn)
        if (file.size > maxSize * 1024 * 1024) {
            setError(`Dosya boyutu ${maxSize}MB'dan büyük olamaz.`)
            setUploading(false)
            return
        }

        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload', // Token için endpointimiz
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

    const clearFile = () => {
        setPreview(null)
        onUpload('')
        if (inputRef.current) inputRef.current.value = ''
    }

    const getFileIcon = () => {
        if (accept.includes('video')) return <FileVideo className="w-8 h-8" />
        if (accept.includes('image')) return <FileImage className="w-8 h-8" />
        return <File className="w-8 h-8" />
    }

    const isImage = preview && (preview.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || accept.includes('image'))
    const isVideo = preview && (preview.match(/\.(mp4|webm|mov|avi)$/i) || accept.includes('video'))

    // Helper to determine if we should show img/video tag or just icon
    const showPreviewMedia = isImage || isVideo

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
                        {isImage && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                            />
                        )}
                        {isVideo && (
                            <video
                                src={preview}
                                className="w-full h-48 object-cover"
                                controls
                            />
                        )}
                        {!showPreviewMedia && (
                            <div className="flex items-center justify-center h-32 bg-white/5">
                                {getFileIcon()}
                                <span className="ml-3 text-sm text-white/60 truncate max-w-[200px]">{preview.split('/').pop()}</span>
                            </div>
                        )}

                        {/* Overlay buttons */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                                onClick={() => inputRef.current?.click()}
                                className="px-4 py-2 bg-white/10 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors"
                            >
                                Değiştir
                            </button>
                            <button
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
