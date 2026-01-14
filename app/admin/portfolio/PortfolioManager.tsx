'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Edit, Plus, Image as ImageIcon, X, Save, Check, AlertCircle, Loader2 } from 'lucide-react'
import FileUpload from '@/components/ui/FileUpload'
import { createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '@/app/actions/portfolio'
import { upload } from '@vercel/blob/client'

type PortfolioItem = {
    id: number
    title: string
    description: string
    mediaUrl: string
    coverUrl?: string
    category: string
    order: number
    isVisible?: boolean
}

export default function PortfolioManager({ initialItems }: { initialItems: PortfolioItem[] }) {
    const [items, setItems] = useState<PortfolioItem[]>(initialItems)
    const [isEditing, setIsEditing] = useState<PortfolioItem | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [formData, setFormData] = useState<Partial<PortfolioItem>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 3000)
    }

    const handleEdit = (item: PortfolioItem) => {
        setFormData(item)
        setIsEditing(item)
        setIsCreating(false)
    }

    const handleNew = () => {
        setFormData({
            title: '',
            description: '',
            mediaUrl: '',
            coverUrl: '',
            category: 'Video Production',
            order: items.length
        })
        setIsCreating(true)
        setIsEditing(null)
    }

    const generateVideoThumbnail = async (videoUrl: string) => {
        setIsGeneratingThumbnail(true)
        try {
            const video = document.createElement('video')
            video.crossOrigin = 'anonymous'
            video.src = videoUrl
            video.currentTime = 1 // 1. saniyeden kare al
            video.muted = true
            video.preload = 'metadata'

            await new Promise((resolve, reject) => {
                video.onloadeddata = () => resolve(true)
                video.onerror = reject
                // Timeout to prevent hanging
                setTimeout(() => reject(new Error("Video load timeout")), 10000)
            })

            // Seek to 1s if not already there (sometimes loadeddata fires before seek completes)
            if (video.currentTime < 0.1) {
                video.currentTime = 1
                await new Promise(r => { video.onseeked = r })
            }

            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

            const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.7))

            if (blob) {
                const file = new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' })

                const newBlob = await upload(file.name, file, {
                    access: 'public',
                    handleUploadUrl: '/api/upload',
                })

                setFormData(prev => ({ ...prev, coverUrl: newBlob.url }))
                showMessage('success', 'Otomatik kapak görseli oluşturuldu!')
            }

        } catch (error) {
            console.error("Thumbnail generation failed:", error)
            // Hata olsa bile devam et, kullanıcı manuel yükleyebilir
        } finally {
            setIsGeneratingThumbnail(false)
        }
    }

    const handleMediaUpload = (url: string) => {
        setFormData(prev => ({ ...prev, mediaUrl: url }))

        // Eğer videosu yüklenmişse ve henüz cover yoksa otomatik oluştur
        if (isVideo(url) && !formData.coverUrl) {
            generateVideoThumbnail(url)
        }
    }

    const handleSave = async () => {
        if (!formData.title?.trim()) {
            showMessage('error', 'Başlık gereklidir.')
            return
        }

        setIsLoading(true)

        try {
            if (isCreating) {
                // Create new
                const result = await createPortfolioItem({
                    title: formData.title!,
                    description: formData.description || '',
                    mediaUrl: formData.mediaUrl || '',
                    coverUrl: formData.coverUrl || undefined,
                    category: formData.category || 'Video Production',
                    order: formData.order || 0
                })

                if (result.success && result.data) {
                    setItems([...items, result.data as PortfolioItem])
                    showMessage('success', 'Proje başarıyla oluşturuldu!')
                    closeModal()
                } else {
                    showMessage('error', 'Proje oluşturulamadı.')
                }
            } else if (isEditing) {
                // Update existing
                const result = await updatePortfolioItem(isEditing.id, {
                    title: formData.title,
                    description: formData.description,
                    mediaUrl: formData.mediaUrl,
                    coverUrl: formData.coverUrl,
                    category: formData.category,
                    order: formData.order,
                    isVisible: isEditing.isVisible
                })

                if (result.success && result.data) {
                    setItems(items.map(i => i.id === isEditing.id ? result.data as PortfolioItem : i))
                    showMessage('success', 'Proje başarıyla güncellendi!')
                    closeModal()
                } else {
                    showMessage('error', 'Proje güncellenemedi.')
                }
            }
        } catch (error) {
            console.error(error)
            showMessage('error', 'Bir hata oluştu.')
        }

        setIsLoading(false)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return

        const result = await deletePortfolioItem(id)
        if (result.success) {
            setItems(items.filter(i => i.id !== id))
            showMessage('success', 'Proje silindi.')
        } else {
            showMessage('error', 'Silme işlemi başarısız.')
        }
    }

    const closeModal = () => {
        setIsEditing(null)
        setIsCreating(false)
        setFormData({})
    }

    const isVideo = (url?: string) => {
        return /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(url || '')
    }

    return (
        <div className="space-y-6">
            {/* Toast Message */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-24 right-8 z-[200] px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg ${message.type === 'success'
                            ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                            : 'bg-red-500/20 border border-red-500/50 text-red-400'
                            }`}
                    >
                        {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                        {message.text}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-display font-bold">Portfolyo Yönetimi</h2>
                    <p className="text-white/40 text-sm mt-1">{items.length} proje listeleniyor</p>
                </div>
                <button
                    onClick={handleNew}
                    className="btn-premium px-4 py-2 flex items-center gap-2"
                >
                    <Plus size={16} /> Yeni Ekle
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-panel p-0 overflow-hidden group relative"
                        >
                            <div className="h-48 bg-white/5 relative bg-black">
                                {item.coverUrl ? (
                                    <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                ) : item.mediaUrl ? (
                                    isVideo(item.mediaUrl) ? (
                                        <video
                                            src={item.mediaUrl}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                            muted
                                            loop
                                            playsInline
                                            onMouseOver={e => e.currentTarget.play().catch(() => { })}
                                            onMouseOut={e => {
                                                e.currentTarget.pause()
                                                e.currentTarget.currentTime = 0
                                            }}
                                        />
                                    ) : (
                                        <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <button onClick={() => handleEdit(item)} className="p-2 bg-black/50 hover:bg-primary-gold hover:text-black rounded-lg transition-colors text-white">
                                        <Edit size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-black/50 hover:bg-red-500 rounded-lg transition-colors text-white">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-[10px] font-bold uppercase tracking-wider text-primary-gold backdrop-blur-sm pointer-events-none">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-display font-bold text-lg mb-2 truncate">{item.title}</h3>
                                <p className="text-white/40 text-xs line-clamp-2">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Editor Modal */}
            {(isEditing || isCreating) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel w-full max-w-2xl p-8 border border-white/20 relative max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-display font-bold mb-6">
                            {isCreating ? 'Yeni Proje Oluştur' : 'Projeyi Düzenle'}
                        </h3>

                        <div className="space-y-6">
                            {/* File Upload (Main) */}
                            <FileUpload
                                label="Proje Görseli / Videosu"
                                folder="images"
                                accept="image/*,video/*"
                                maxSize={100}
                                currentUrl={formData.mediaUrl}
                                onUpload={handleMediaUpload}
                            />

                            {/* Cover Image Upload (Only if Video) */}
                            {isVideo(formData.mediaUrl) && (
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
                                    {isGeneratingThumbnail && (
                                        <div className="absolute inset-0 z-10 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="animate-spin text-primary-gold" />
                                                <span className="text-xs text-white/80">Kapak oluşturuluyor...</span>
                                            </div>
                                        </div>
                                    )}
                                    <FileUpload
                                        label="Video Kapak Görseli (Thumbnail) (Opsiyonel)"
                                        folder="images"
                                        accept="image/*"
                                        maxSize={10}
                                        currentUrl={formData.coverUrl}
                                        onUpload={(url) => setFormData({ ...formData, coverUrl: url })}
                                    />
                                    <p className="text-[10px] text-white/40 mt-2">
                                        * Videoların hızlı yüklenmesi için kapak görseli önerilir.<br />
                                        * Video yüklediğinizde otomatik oluşturulmaya çalışılır.<br />
                                        * Önerilen boyut: 1920x1080px (16:9)
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Proje Başlığı *</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 transition-colors placeholder:text-white/20"
                                    placeholder="Örn: Nike Air Launch"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Kategori</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 [&>option]:bg-gray-900"
                                        value={formData.category || 'Video Production'}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Video Production">Video Production</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Web Design">Web Design</option>
                                        <option value="Branding">Branding</option>
                                        <option value="E-Commerce">E-Commerce</option>
                                        <option value="Mobile App">Mobile App</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Sıralama</label>
                                    <input
                                        type="number"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                        value={formData.order || 0}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Açıklama</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 h-32 placeholder:text-white/20 resize-none"
                                    placeholder="Proje hakkında kısa ve etkileyici bir açıklama..."
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="pt-6 flex justify-end gap-3 border-t border-white/10">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-3 rounded-xl hover:bg-white/5 text-white/60 transition-colors text-sm font-bold"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="btn-premium px-8 py-3 flex items-center gap-2"
                                >
                                    {isLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : <Save size={16} />}
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
