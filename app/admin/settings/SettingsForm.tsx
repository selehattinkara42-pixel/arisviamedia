'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Globe, Code, Image as ImageIcon, Loader2, Check, AlertCircle, Lock } from 'lucide-react'
import FileUpload from '@/components/ui/FileUpload'
import { updateSiteSettings } from '@/app/actions/settings'
import { changePassword } from '@/app/actions/auth'

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
    const [formData, setFormData] = useState<Settings>({ ...defaultSettings, ...initialSettings })
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Password change state
    const [passData, setPassData] = useState({ current: '', new: '', confirm: '' })
    const [isPassLoading, setIsPassLoading] = useState(false)

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 4000)
    }

    const handleSave = async () => {
        setIsLoading(true)

        try {
            const result = await updateSiteSettings({
                seoTitle: formData.seoTitle,
                seoDescription: formData.seoDescription,
                logoUrl: formData.logoUrl,
                favicon: formData.favicon,
                globalCss: formData.globalCss
            })

            if (result.success) {
                showMessage('success', 'Ayarlar başarıyla kaydedildi!')
            } else {
                showMessage('error', 'Ayarlar kaydedilemedi.')
            }
        } catch (e) {
            showMessage('error', 'Bir hata oluştu.')
        }

        setIsLoading(false)
    }

    const handlePasswordChange = async () => {
        if (!passData.current || !passData.new || !passData.confirm) {
            showMessage('error', 'Lütfen tüm alanları doldurun.')
            return
        }

        if (passData.new !== passData.confirm) {
            showMessage('error', 'Yeni şifreler eşleşmiyor.')
            return
        }

        setIsPassLoading(true)

        try {
            const result = await changePassword(passData.current, passData.new)
            if (result.success) {
                showMessage('success', 'Şifre başarıyla güncellendi!')
                setPassData({ current: '', new: '', confirm: '' })
            } else {
                showMessage('error', result.error || 'Şifre değiştirilemedi.')
            }
        } catch (e) {
            showMessage('error', 'Bir hata oluştu.')
        }

        setIsPassLoading(false)
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

                {/* Security, Advanced & Save */}
                <div className="space-y-6">
                    {/* Security Section */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-8 border-red-500/20">
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="text-red-400" />
                            <h3 className="font-display font-bold text-xl text-white">Güvenlik Ayarları</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-white/40 mb-2">Mevcut Şifre</label>
                                <input
                                    type="password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                                    value={passData.current}
                                    onChange={e => setPassData({ ...passData, current: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Yeni Şifre</label>
                                    <input
                                        type="password"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                                        value={passData.new}
                                        onChange={e => setPassData({ ...passData, new: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-white/40 mb-2">Yeni Şifre (Tekrar)</label>
                                    <input
                                        type="password"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                                        value={passData.confirm}
                                        onChange={e => setPassData({ ...passData, confirm: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handlePasswordChange}
                                disabled={isPassLoading}
                                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-colors flex items-center justify-center gap-2"
                            >
                                {isPassLoading ? <Loader2 className="animate-spin" size={16} /> : <Lock size={16} />}
                                Şifreyi Güncelle
                            </button>
                        </div>
                    </motion.div>

                    {/* CSS Section */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Code className="text-accent-purple" />
                            <h3 className="font-display font-bold text-xl text-white">Gelişmiş CSS</h3>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-white/40 mb-2">Global CSS Override</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-gold/50 min-h-[150px] font-mono text-xs"
                                placeholder=":root { --primary-gold: #ff0000; }"
                                value={formData.globalCss || ''}
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
                        Genel Ayarları Kaydet
                    </button>
                </div>
            </div>
        </div>
    )
}
