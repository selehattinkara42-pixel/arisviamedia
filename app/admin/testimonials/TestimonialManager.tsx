'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Edit, Plus, User, Star, Save, X, Quote, Check, AlertCircle } from 'lucide-react'
import { getLocalTestimonials, setLocalTestimonials, generateId } from '@/lib/localData'

type Testimonial = {
    id: number
    name: string
    role: string
    company: string
    content: string
    rating: number
    isVisible: boolean
    order?: number
    avatarUrl?: string | null
}

export default function TestimonialManager({ initialItems }: { initialItems: Testimonial[] }) {
    const [items, setItems] = useState<Testimonial[]>(initialItems)
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [formData, setFormData] = useState<Partial<Testimonial>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Load from localStorage on mount
    useEffect(() => {
        const localItems = getLocalTestimonials()
        if (localItems.length > 0) {
            setItems(localItems as Testimonial[])
        }
    }, [])

    // Save to localStorage whenever items change
    useEffect(() => {
        if (items.length > 0) {
            setLocalTestimonials(items as any)
        }
    }, [items])

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 3000)
    }

    const handleEdit = (item: Testimonial) => {
        setFormData(item)
        setIsEditing(item.id)
    }

    const handleNew = () => {
        setFormData({
            name: '',
            role: '',
            company: '',
            content: '',
            rating: 5,
            isVisible: true
        })
        setIsEditing(-1)
    }

    const handleSave = () => {
        if (!formData.name?.trim() || !formData.content?.trim()) {
            showMessage('error', 'İsim ve yorum gerekli!')
            return
        }

        setIsLoading(true)

        if (isEditing === -1) {
            const newItem: Testimonial = {
                id: generateId(),
                name: formData.name!,
                role: formData.role || '',
                company: formData.company || '',
                content: formData.content!,
                rating: formData.rating || 5,
                isVisible: true,
                order: items.length
            }
            setItems([...items, newItem])
            showMessage('success', 'Referans oluşturuldu!')
        } else if (isEditing !== null) {
            setItems(items.map(i => i.id === isEditing ? { ...i, ...formData } as Testimonial : i))
            showMessage('success', 'Referans güncellendi!')
        }

        setIsEditing(null)
        setIsLoading(false)
    }

    const handleDelete = (id: number) => {
        if (!confirm('Silmek istediğinize emin misiniz?')) return
        setItems(items.filter(i => i.id !== id))
        showMessage('success', 'Referans silindi.')
    }

    return (
        <div className="space-y-6">
            {/* Toast Message */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`fixed top-24 right-8 z-[200] px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg ${message.type === 'success'
                            ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                            : 'bg-red-500/20 border border-red-500/50 text-red-400'
                        }`}
                >
                    {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </motion.div>
            )}

            <div className="flex justify-between items-center">
                <p className="text-white/40 text-sm">{items.length} referans</p>
                <button onClick={handleNew} className="btn-premium px-4 py-2 flex items-center gap-2">
                    <Plus size={16} /> Yeni Referans
                </button>
            </div>

            {/* Info Banner */}
            <div className="glass-card p-4 border-blue-500/30 bg-blue-500/5">
                <p className="text-blue-400 text-sm">
                    💡 Referanslar tarayıcınızda kaydedilir. Sayfayı yenileseniz bile veriler korunur.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="glass-panel p-6 relative group"
                        >
                            <Quote className="absolute top-4 right-4 text-white/5 w-16 h-16" />
                            <div className="flex items-start gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center text-primary-gold">
                                    <User size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-white">{item.name}</h3>
                                    <p className="text-xs text-primary-gold font-bold uppercase tracking-wider">{item.role}, {item.company}</p>

                                    <div className="flex gap-1 my-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} className={i < item.rating ? "fill-primary-gold text-primary-gold" : "text-white/20"} />
                                        ))}
                                    </div>

                                    <p className="text-white/60 text-sm italic leading-relaxed">"{item.content}"</p>
                                </div>
                            </div>

                            <div className="absolute top-4 left-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button onClick={() => handleEdit(item)} className="p-2 bg-black/50 hover:bg-primary-gold hover:text-black rounded text-white"><Edit size={14} /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-black/50 hover:bg-red-500 rounded text-white"><Trash2 size={14} /></button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            {isEditing !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel w-full max-w-lg p-8 border border-white/20 relative">
                        <button onClick={() => setIsEditing(null)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={24} /></button>
                        <h3 className="text-xl font-bold mb-6 font-display">{isEditing === -1 ? 'Yeni Referans' : 'Referans Düzenle'}</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                    placeholder="Ad Soyad *"
                                    value={formData.name || ''}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                    placeholder="Şirket"
                                    value={formData.company || ''}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                    placeholder="Pozisyon"
                                    value={formData.role || ''}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                />
                                <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 border border-white/10">
                                    <span className="text-xs text-white/40 uppercase font-bold">Puan:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        className="bg-transparent text-white w-full focus:outline-none p-3"
                                        value={formData.rating || 5}
                                        onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 h-32 resize-none"
                                placeholder="Müşteri yorumu... *"
                                value={formData.content || ''}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                            />

                            <button onClick={handleSave} disabled={isLoading} className="btn-premium w-full py-3 flex items-center justify-center gap-2">
                                <Save size={16} /> Kaydet
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
