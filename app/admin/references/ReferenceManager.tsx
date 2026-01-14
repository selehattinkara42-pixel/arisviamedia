'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Edit, Plus, X, Save, Check, AlertCircle, ExternalLink, Building2 } from 'lucide-react'
import FileUpload from '@/components/ui/FileUpload'
import { createReference, updateReference, deleteReference } from '@/app/actions/references'

type ReferenceItem = {
    id: number
    name: string
    logoUrl?: string | null
    websiteUrl?: string | null
    description?: string | null
    category: string
    order: number
    isVisible: boolean
}

const CATEGORIES = ['Marka', 'Ajans', 'Kurum', 'Startup', 'E-Ticaret', 'Restoran', 'Diğer']

export default function ReferenceManager({ initialItems }: { initialItems: ReferenceItem[] }) {
    const [items, setItems] = useState<ReferenceItem[]>(initialItems)
    const [isEditing, setIsEditing] = useState<ReferenceItem | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [formData, setFormData] = useState<Partial<ReferenceItem>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 3000)
    }

    const handleEdit = (item: ReferenceItem) => {
        setFormData(item)
        setIsEditing(item)
        setIsCreating(false)
    }

    const handleNew = () => {
        setFormData({
            name: '',
            logoUrl: '',
            websiteUrl: '',
            description: '',
            category: 'Marka',
            order: items.length
        })
        setIsCreating(true)
        setIsEditing(null)
    }

    const handleSave = async () => {
        if (!formData.name?.trim()) {
            showMessage('error', 'Marka adı gerekli!')
            return
        }

        setIsLoading(true)

        try {
            if (isCreating) {
                const result = await createReference({
                    name: formData.name!,
                    logoUrl: formData.logoUrl || null,
                    websiteUrl: formData.websiteUrl || null,
                    description: formData.description || null,
                    category: formData.category || 'Marka',
                    order: formData.order || 0
                })

                if (result.success && result.data) {
                    setItems([...items, result.data as ReferenceItem])
                    showMessage('success', 'Referans eklendi!')
                    closeModal()
                } else {
                    showMessage('error', result.error || 'Referans eklenemedi.')
                }
            } else if (isEditing) {
                const result = await updateReference(isEditing.id, {
                    name: formData.name,
                    logoUrl: formData.logoUrl,
                    websiteUrl: formData.websiteUrl,
                    description: formData.description,
                    category: formData.category,
                    order: formData.order,
                    isVisible: isEditing.isVisible
                })

                if (result.success && result.data) {
                    setItems(items.map(i => i.id === isEditing.id ? result.data as ReferenceItem : i))
                    showMessage('success', 'Referans güncellendi!')
                    closeModal()
                } else {
                    showMessage('error', result.error || 'Referans güncellenemedi.')
                }
            }
        } catch (error) {
            console.error(error)
            showMessage('error', 'Bir hata oluştu.')
        }

        setIsLoading(false)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Bu referansı silmek istediğinize emin misiniz?')) return

        const result = await deleteReference(id)
        if (result.success) {
            setItems(items.filter(i => i.id !== id))
            showMessage('success', 'Referans silindi.')
        } else {
            showMessage('error', 'Silme işlemi başarısız.')
        }
    }

    const toggleVisibility = async (item: ReferenceItem) => {
        const result = await updateReference(item.id, { isVisible: !item.isVisible })
        if (result.success && result.data) {
            setItems(items.map(i => i.id === item.id ? result.data as ReferenceItem : i))
        }
    }

    const closeModal = () => {
        setIsEditing(null)
        setIsCreating(false)
        setFormData({})
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
                    <h2 className="text-2xl font-display font-bold">Referanslar</h2>
                    <p className="text-white/40 text-sm mt-1">{items.length} marka/kurum</p>
                </div>
                <button onClick={handleNew} className="btn-premium px-4 py-2 flex items-center gap-2">
                    <Plus size={16} /> Yeni Referans
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`group relative glass-panel p-4 flex flex-col items-center text-center transition-all ${!item.isVisible ? 'opacity-50' : ''}`}
                        >
                            {/* Logo */}
                            <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden mb-3">
                                {item.logoUrl ? (
                                    <img src={item.logoUrl} alt={item.name} className="w-full h-full object-contain p-2" />
                                ) : (
                                    <Building2 size={32} className="text-white/20" />
                                )}
                            </div>

                            <h4 className="font-bold text-sm truncate w-full">{item.name}</h4>
                            <span className="text-xs text-primary-gold">{item.category}</span>

                            {/* Actions */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button onClick={() => handleEdit(item)} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20">
                                    <Edit size={12} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 text-red-400">
                                    <Trash2 size={12} />
                                </button>
                            </div>

                            {/* Visibility Toggle */}
                            <button
                                onClick={() => toggleVisibility(item)}
                                className={`absolute top-2 left-2 w-3 h-3 rounded-full transition-colors ${item.isVisible ? 'bg-green-500' : 'bg-red-500'}`}
                                title={item.isVisible ? 'Görünür' : 'Gizli'}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {items.length === 0 && (
                <div className="text-center py-20 text-white/30">
                    <Building2 size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Henüz referans eklenmemiş</p>
                </div>
            )}

            {/* Editor Modal */}
            {(isEditing || isCreating) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel w-full max-w-lg p-8 border border-white/20 relative max-h-[90vh] overflow-y-auto"
                    >
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white/40 hover:text-white">
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-display font-bold mb-6">
                            {isCreating ? 'Yeni Referans Ekle' : 'Referansı Düzenle'}
                        </h3>

                        <div className="space-y-5">
                            {/* Logo Upload */}
                            <FileUpload
                                label="Marka Logosu"
                                folder="logos"
                                accept="image/*"
                                maxSize={10}
                                currentUrl={formData.logoUrl || undefined}
                                onUpload={(url) => setFormData({ ...formData, logoUrl: url })}
                            />

                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Marka Adı *</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                    placeholder="Örn: Nike, Apple, Mercedes"
                                    value={formData.name || ''}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Kategori</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 [&>option]:bg-gray-900"
                                        value={formData.category || 'Marka'}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Sıralama</label>
                                    <input
                                        type="number"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                        value={formData.order || 0}
                                        onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Website URL</label>
                                <div className="flex gap-2 items-center">
                                    <ExternalLink size={16} className="text-white/30" />
                                    <input
                                        type="url"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                        placeholder="https://example.com"
                                        value={formData.websiteUrl || ''}
                                        onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Açıklama (Opsiyonel)</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 h-20 resize-none"
                                    placeholder="Proje hakkında kısa bir not..."
                                    value={formData.description || ''}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button onClick={closeModal} className="px-6 py-3 rounded-xl hover:bg-white/5 text-white/60 font-bold text-sm">
                                    İptal
                                </button>
                                <button onClick={handleSave} disabled={isLoading} className="btn-premium px-8 py-3 flex items-center gap-2">
                                    <Save size={16} /> Kaydet
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
