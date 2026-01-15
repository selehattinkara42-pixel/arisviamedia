
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Trash2, Copy, Check, Loader2, DownloadCloud, AlertTriangle } from 'lucide-react'
import { getMediaFiles, deleteMediaFile, BlobFile } from '@/app/actions/media'
import Image from 'next/image'

export default function MediaLibraryPage() {
    const [files, setFiles] = useState<BlobFile[]>([])
    const [loading, setLoading] = useState(true)
    const [cursor, setCursor] = useState<string | undefined>(undefined)
    const [hasMore, setHasMore] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

    const loadFiles = async (nextCursor?: string) => {
        setLoading(true)
        const res = await getMediaFiles(nextCursor)
        if (nextCursor) {
            setFiles(prev => [...prev, ...res.blobs])
        } else {
            setFiles(res.blobs)
        }
        setCursor(res.cursor)
        setHasMore(res.hasMore)
        setLoading(false)
    }

    useEffect(() => {
        loadFiles()
    }, [])

    const handleDelete = async (url: string) => {
        if (!confirm('Bu dosyayı kalıcı olarak silmek istediğinize emin misiniz?')) return

        setDeletingId(url)
        const res = await deleteMediaFile(url)
        if (res.success) {
            setFiles(files.filter(f => f.url !== url))
        } else {
            alert('Dosya silinemedi!')
        }
        setDeletingId(null)
    }

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url)
        setCopiedUrl(url)
        setTimeout(() => setCopiedUrl(null), 2000)
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Medya Kütüphanesi</h2>
                    <p className="text-white/40">Yüklenen tüm görselleri yönetin.</p>
                </div>
                {/* Upload butonu şimdilik yok, diğer sayfalardan yükleniyor. İleride buraya da eklenebilir. */}
            </header>

            {/* Warning */}
            <div className="bg-primary-gold/10 border border-primary-gold/20 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="text-primary-gold min-w-[20px]" size={20} />
                <p className="text-sm text-primary-gold/80">
                    <strong>Dikkat:</strong> Buradan sildiğiniz bir görsel, eğer sitenizde (örneğin bir projede) kullanılıyorsa o alanda kırık link olarak görünecektir. Silmeden önce kullanılmadığından emin olun.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <AnimatePresence>
                    {files.map((file) => (
                        <motion.div
                            key={file.url}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            layout
                            className="glass-card group relative overflow-hidden aspect-square flex flex-col items-center justify-center border-white/5 bg-black/40 hover:border-white/20 transition-all"
                        >
                            {/* Image Preview (Fill) */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={file.url}
                                    alt={file.pathname}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Details Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-xs text-white truncate font-medium mb-1" title={file.pathname}>{file.pathname}</p>
                                <p className="text-[10px] text-white/50">{formatSize(file.size)}</p>

                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => handleCopy(file.url)}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-1 flex items-center justify-center"
                                        title="URL Kopyala"
                                    >
                                        {copiedUrl === file.url ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(file.url)}
                                        disabled={deletingId === file.url}
                                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                                        title="Sil"
                                    >
                                        {deletingId === file.url ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Load More */}
            {hasMore && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => loadFiles(cursor)}
                        disabled={loading}
                        className="btn-secondary flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <DownloadCloud size={18} />}
                        Daha Fazla Yükle
                    </button>
                </div>
            )}

            {!loading && files.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-white/20">
                    <ImageIcon size={48} className="mb-4" />
                    <p>Henüz hiç görsel yüklenmemiş.</p>
                </div>
            )}
        </div>
    )
}
