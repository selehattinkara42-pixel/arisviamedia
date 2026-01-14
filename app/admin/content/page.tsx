'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, RefreshCw, Type, LayoutTemplate, Database } from 'lucide-react'
import { getAllContent, updateContent, seedDefaultContent, PageContentData } from '@/app/actions/content'

const FONT_SIZES = [
    { value: 'xs', label: 'Çok Küçük (xs)' },
    { value: 'sm', label: 'Küçük (sm)' },
    { value: 'base', label: 'Normal (base)' },
    { value: 'lg', label: 'Büyük (lg)' },
    { value: 'xl', label: 'XL' },
    { value: '2xl', label: '2XL' },
    { value: '3xl', label: '3XL' },
    { value: '4xl', label: '4XL' },
    { value: '5xl', label: '5XL' },
    { value: '6xl', label: '6XL' },
    { value: '7xl', label: '7XL' },
    { value: '8xl', label: '8XL' },
    { value: '9xl', label: 'Devasa (9XL)' },
]

const PAGES = [
    { id: 'home', label: 'Anasayfa' },
    { id: 'services', label: 'Hizmetler' },
    { id: 'portfolio', label: 'Portfolyo' },
    { id: 'packages', label: 'Paketler' },
    { id: 'references', label: 'Referanslar' },
    { id: 'contact', label: 'İletişim' },
    { id: 'global', label: 'Genel (Footer/Header)' },
]

export default function ContentManagerPage() {
    const [contents, setContents] = useState<PageContentData[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('home')
    const [savingId, setSavingId] = useState<number | null>(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const data = await getAllContent()
        setContents(data as PageContentData[])
        setLoading(false)
    }

    const handleSeed = async () => {
        if (!confirm('Eksik içerikler varsayılan değerlerle doldurulacak. Bu işlem mevcut yazılarınızı silmez, sadece eksikleri tamamlar. Onaylıyor musunuz?')) return
        setLoading(true)
        const res = await seedDefaultContent()
        if (res.success) {
            alert(`İşlem başarılı! ${res.count || 0} yeni içerik eklendi.`)
        } else {
            alert('Bir hata oluştu.')
        }
        await loadData()
    }

    const handleSave = async (item: PageContentData) => {
        setSavingId(item.id)
        await updateContent(item.id, item.content, item.fontSize)
        setTimeout(() => setSavingId(null), 500)
    }

    const handleLocalChange = (id: number, field: 'content' | 'fontSize', value: string) => {
        setContents(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ))
    }

    const filteredContents = contents.filter(c => c.page === activeTab)

    return (
        <div className="space-y-6 pb-20 pt-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Site İçerik Yönetimi</h2>
                    <p className="text-white/40 text-sm">Sitedeki tüm metinleri ve font büyüklüklerini buradan yönetebilirsiniz.</p>
                </div>

                <button
                    onClick={handleSeed}
                    className="flex items-center gap-2 px-6 py-3 bg-primary-gold/10 hover:bg-primary-gold/20 border border-primary-gold/30 rounded-xl text-xs font-bold text-primary-gold uppercase tracking-wider transition-all"
                >
                    <Database size={16} />
                    Veritabanını Güncelle / Onar
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 border-b border-white/10 mb-6 no-scrollbar">
                {PAGES.map(page => (
                    <button
                        key={page.id}
                        onClick={() => setActiveTab(page.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === page.id
                            ? 'bg-primary-gold text-black'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                    >
                        {page.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-20 text-white/20">
                    <RefreshCw className="animate-spin w-8 h-8" />
                </div>
            ) : filteredContents.length === 0 ? (
                <div className="text-center py-20 text-white/20 border border-dashed border-white/10 rounded-2xl bg-white/5">
                    <LayoutTemplate size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="font-bold mb-2">Bu sekmede henüz içerik yok.</p>
                    <p className="text-sm max-w-md mx-auto">
                        Eğer "Anasayfa" sekmesindeyseniz ve içerik yoksa, yukarıdaki
                        <span className="text-primary-gold mx-1">"Veritabanını Güncelle / Onar"</span>
                        butonuna basarak varsayılan içerikleri yükleyin.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredContents.map(item => (
                        <div key={item.id} className="glass-panel p-6 flex flex-col md:flex-row gap-6 items-start border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex-1 w-full">
                                <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                                    <label className="text-xs font-bold text-primary-gold uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-gold"></span>
                                        {item.label}
                                    </label>
                                    <span className="text-[10px] text-white/20 font-mono bg-white/5 px-2 py-1 rounded">{item.key}</span>
                                </div>

                                <div className="space-y-4">
                                    {/* Content Input */}
                                    <div className="relative group">
                                        <textarea
                                            value={item.content}
                                            onChange={(e) => handleLocalChange(item.id, 'content', e.target.value)}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-gold/50 min-h-[100px] resize-y transition-all"
                                            style={{
                                                fontSize: item.fontSize === 'xs' ? '0.75rem' :
                                                    item.fontSize === 'sm' ? '0.875rem' :
                                                        item.fontSize === 'lg' ? '1.125rem' : '1rem' // Preview size estimation
                                            }}
                                        />
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <span className="text-[10px] text-white/30 bg-black/50 px-2 py-1 rounded">Düzenlenebilir</span>
                                        </div>
                                    </div>

                                    {/* Settings Row */}
                                    <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg w-full md:w-auto border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Type size={16} className="text-white/40" />
                                            <span className="text-xs text-white/40 font-bold uppercase mr-2">Yazı Boyutu:</span>
                                            <select
                                                value={item.fontSize}
                                                onChange={(e) => handleLocalChange(item.id, 'fontSize', e.target.value)}
                                                className="bg-transparent text-sm text-white focus:outline-none [&>option]:bg-zinc-900 cursor-pointer hover:text-primary-gold transition-colors"
                                            >
                                                {FONT_SIZES.map(size => (
                                                    <option key={size.value} value={size.value}>{size.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={() => handleSave(item)}
                                disabled={savingId === item.id}
                                className={`h-full min-h-[50px] md:self-end px-6 py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${savingId === item.id
                                    ? 'bg-green-500/20 text-green-400 cursor-wait border border-green-500/30'
                                    : 'bg-white/10 hover:bg-primary-gold hover:text-black text-white hover:scale-105 active:scale-95'
                                    }`}
                            >
                                {savingId === item.id ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
                                {savingId === item.id ? 'Kaydediliyor...' : 'Kaydet'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
