'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Globe, Code, Image as ImageIcon, Loader2, Check, AlertCircle } from 'lucide-react'
import FileUpload from '@/components/ui/FileUpload'

type Settings = {
    seoTitle: string
    seoDescription: string
    logoUrl: string
    favicon: string
    globalCss: string
}

const defaultSettings: Settings = {
    seoTitle: 'ARİS VİA MEDIA | Premium Digital Agency',
    seoDescription: 'Estetiği teknolojiyle, lüksü inovasyonla harmanlayan dijital ajans.',
    logoUrl: '',
    favicon: '',
    globalCss: ''
}

export default function SettingsForm({ initialSettings }: { initialSettings?: Partial<Settings> }) {
    const [formData, setFormData] = useState<Settings>(defaultSettings)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('arisvia_settings')
            if (stored) {
                const parsed = JSON.parse(stored)
                setFormData({ ...defaultSettings, ...parsed })
            } else if (initialSettings) {
                setFormData({ ...defaultSettings, ...initialSettings })
            }
        } catch (e) {
            console.error('Error loading settings:', e)
        }
    }, [initialSettings])

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 4000)
    }

    const handleSave = () => {
        setIsLoading(true)

        try {
            localStorage.setItem('arisvia_settings', JSON.stringify(formData))
            showMessage('success', 'Ayarlar başarıyla kaydedildi!')
        } catch (e) {
            showMessage('error', 'Ayarlar kaydedilemedi.')
        }

        setIsLoading(false)
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

            <div className="grid lg:grid-cols-2 gap-8">
                {/* SEO & Identity */}
                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="text-primary-gold" />
                            <h3 className="font-display font-bold text-xl text-white">SEO & Kimlik</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Site Başlığı (Title)</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                                    value={formData.seoTitle}
                                    onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                                    placeholder="ARİS VİA MEDIA | Premium Digital Agency"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Site Açıklaması (Description)</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 h-32 resize-none"
                                    value={formData.seoDescription}
                                    onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                                    placeholder="Estetiği teknolojiyle, lüksü inovasyonla harmanlayan dijital ajans."
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <ImageIcon className="text-accent-cyan" />
                            <h3 className="font-display font-bold text-xl text-white">Varlıklar (Assets)</h3>
                        </div>

                        <div className="space-y-6">
                            <FileUpload
                                label="Favicon"
                                folder="logos"
                                accept="image/*,.ico"
                                maxSize={5}
                                currentUrl={formData.favicon || undefined}
                                onUpload={(url) => setFormData({ ...formData, favicon: url })}
                            />

                            <FileUpload
                                label="Site Logosu"
                                folder="logos"
                                accept="image/*"
                                maxSize={10}
                                currentUrl={formData.logoUrl || undefined}
                                onUpload={(url) => setFormData({ ...formData, logoUrl: url })}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Advanced & Save */}
                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Code className="text-accent-purple" />
                            <h3 className="font-display font-bold text-xl text-white">Gelişmiş CSS</h3>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-white/40 mb-2">Global CSS Override</label>
                            <p className="text-[10px] text-white/40 mb-2">Dikkat: Buraya yazılan CSS tüm siteyi etkiler. Sadece uzman kullanımı içindir.</p>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 min-h-[300px] font-mono text-xs"
                                placeholder=":root { --primary-gold: #ff0000; }"
                                value={formData.globalCss}
                                onChange={e => setFormData({ ...formData, globalCss: e.target.value })}
                            />
                        </div>
                    </motion.div>

                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="w-full btn-premium py-4 flex items-center justify-center gap-3 text-lg"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
                        Ayarları Kaydet
                    </button>

                    <p className="text-center text-white/40 text-xs">
                        💡 Ayarlar tarayıcınızda kaydedilir.
                    </p>
                </div>
            </div>
        </div>
    )
}
