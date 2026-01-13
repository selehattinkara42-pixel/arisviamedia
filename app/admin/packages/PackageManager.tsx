'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Edit, Plus, Check, Star, Save, X, AlertCircle } from 'lucide-react'
import { getLocalPackages, setLocalPackages, generateId } from '@/lib/localData'

type PackageItem = {
    id: number
    name: string
    price: number
    features: string[]
    badge?: string | null
    isVisible?: boolean
}

export default function PackageManager({ initialPackages }: { initialPackages: PackageItem[] }) {
    const [packages, setPackages] = useState<PackageItem[]>(initialPackages)
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [formData, setFormData] = useState<Partial<PackageItem> & { priceNum: string }>({ priceNum: '0' })
    const [isLoading, setIsLoading] = useState(false)
    const [featureInput, setFeatureInput] = useState('')
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Load from localStorage on mount
    useEffect(() => {
        const localPackages = getLocalPackages()
        if (localPackages.length > 0) {
            setPackages(localPackages as PackageItem[])
        }
    }, [])

    // Save to localStorage whenever packages change
    useEffect(() => {
        if (packages.length > 0) {
            setLocalPackages(packages as any)
        }
    }, [packages])

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 3000)
    }

    const handleEdit = (pkg: PackageItem) => {
        setFormData({
            ...pkg,
            priceNum: pkg.price.toString()
        })
        setIsEditing(pkg.id)
    }

    const handleNew = () => {
        setFormData({
            name: '',
            priceNum: '',
            features: [],
            badge: ''
        })
        setIsEditing(-1)
    }

    const addFeature = () => {
        if (!featureInput.trim()) return
        const currentFeatures = formData.features || []
        setFormData({ ...formData, features: [...currentFeatures, featureInput.trim()] })
        setFeatureInput('')
    }

    const removeFeature = (index: number) => {
        const currentFeatures = formData.features || []
        setFormData({ ...formData, features: currentFeatures.filter((_, i) => i !== index) })
    }

    const handleSave = () => {
        if (!formData.name?.trim()) {
            showMessage('error', 'Paket adı gerekli!')
            return
        }

        setIsLoading(true)

        if (isEditing === -1) {
            // Create new
            const newPackage: PackageItem = {
                id: generateId(),
                name: formData.name!,
                price: parseFloat(formData.priceNum) || 0,
                features: formData.features || [],
                badge: formData.badge || null,
                isVisible: true
            }
            setPackages([...packages, newPackage])
            showMessage('success', 'Paket oluşturuldu!')
        } else if (isEditing !== null) {
            // Update
            setPackages(packages.map(p => p.id === isEditing ? {
                ...p,
                name: formData.name!,
                price: parseFloat(formData.priceNum) || 0,
                features: formData.features || [],
                badge: formData.badge || null
            } : p))
            showMessage('success', 'Paket güncellendi!')
        }

        setIsEditing(null)
        setIsLoading(false)
    }

    const handleDelete = (id: number) => {
        if (!confirm('Bu paketi silmek istediğinize emin misiniz?')) return
        setPackages(packages.filter(p => p.id !== id))
        showMessage('success', 'Paket silindi.')
    }

    return (
        <div className="space-y-8">
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
                <p className="text-white/40 text-sm">{packages.length} paket</p>
                <button onClick={handleNew} className="btn-premium px-4 py-2 flex items-center gap-2">
                    <Plus size={16} /> Yeni Paket
                </button>
            </div>

            {/* Info Banner */}
            <div className="glass-card p-4 border-blue-500/30 bg-blue-500/5">
                <p className="text-blue-400 text-sm">
                    💡 Paketler tarayıcınızda kaydedilir. Sayfayı yenileseniz bile veriler korunur.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {packages.map((pkg) => (
                        <motion.div
                            key={pkg.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-panel p-8 relative group border-t-4 border-t-transparent hover:border-t-primary-gold transition-all"
                        >
                            {pkg.badge && (
                                <div className="absolute top-4 right-4 bg-primary-gold text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                                    {pkg.badge}
                                </div>
                            )}

                            <h3 className="font-display font-bold text-2xl text-white mb-2">{pkg.name}</h3>
                            <div className="text-3xl font-bold text-primary-gold mb-6 font-display">
                                ₺{pkg.price.toLocaleString('tr-TR')}
                                <span className="text-sm text-white/40 font-body font-normal"> / Proje</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {pkg.features.slice(0, 4).map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                                        <Check size={14} className="text-primary-gold" />
                                        {f}
                                    </li>
                                ))}
                                {pkg.features.length > 4 && (
                                    <li className="text-xs text-white/30 italic">+ {pkg.features.length - 4} özellik daha...</li>
                                )}
                            </ul>

                            <div className="flex gap-2 opacity-20 group-hover:opacity-100 transition-opacity justify-end mt-4 pt-4 border-t border-white/5">
                                <button onClick={() => handleEdit(pkg)} className="text-primary-gold hover:text-white transition-colors text-sm font-bold flex items-center gap-1">
                                    <Edit size={14} /> DÜZENLE
                                </button>
                                <button onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:text-white transition-colors text-sm font-bold flex items-center gap-1 ml-4">
                                    <Trash2 size={14} /> SİL
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Editor Modal */}
            {isEditing !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel w-full max-w-xl p-8 border border-white/20 relative max-h-[90vh] overflow-y-auto"
                    >
                        <button onClick={() => setIsEditing(null)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={24} /></button>
                        <h3 className="text-2xl font-display font-bold mb-6">{isEditing === -1 ? 'Yeni Paket Oluştur' : 'Paketi Düzenle'}</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Paket Adı *</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                        placeholder="Örn: Starter"
                                        value={formData.name || ''}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Fiyat (₺)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                        placeholder="15000"
                                        value={formData.priceNum}
                                        onChange={e => setFormData({ ...formData, priceNum: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Rozet (Opsiyonel)</label>
                                <div className="flex gap-2 items-center">
                                    <Star size={16} className="text-primary-gold" />
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                        placeholder="Örn: EN POPÜLER"
                                        value={formData.badge || ''}
                                        onChange={e => setFormData({ ...formData, badge: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Özellikler</label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50"
                                        placeholder="Özellik ekle..."
                                        value={featureInput}
                                        onChange={e => setFeatureInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && addFeature()}
                                    />
                                    <button onClick={addFeature} className="px-4 bg-white/10 rounded-xl hover:bg-white/20"><Plus size={18} /></button>
                                </div>
                                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                    {(formData.features || []).map((f, i) => (
                                        <div key={i} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg text-sm">
                                            <span>{f}</span>
                                            <button onClick={() => removeFeature(i)} className="text-white/20 hover:text-red-500"><X size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end gap-3">
                                <button onClick={() => setIsEditing(null)} className="px-6 py-3 rounded-xl hover:bg-white/5 text-white/60 font-bold text-sm">İptal</button>
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
