'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, Smartphone, Monitor, Check } from 'lucide-react'
import FileUpload from '@/components/ui/FileUpload'
import { updateLogoConfig } from '@/app/actions/logo'

type LogoConfig = {
    logoUrl: string
    width: number
    height: number
    x: number
    y: number
    visibility: string[]
}

const defaultConfig: LogoConfig = {
    logoUrl: '',
    width: 150,
    height: 50,
    x: 20,
    y: 20,
    visibility: ['home', 'portfolio', 'packages']
}

export default function LogoEditor({ initialConfig }: { initialConfig?: any }) {
    const [config, setConfig] = useState<LogoConfig>({ ...defaultConfig, ...initialConfig })
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')

    const SimpleSlider = ({ value, min, max, onChange, label }: any) => (
        <div className="mb-6">
            <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">{label}</label>
                <span className="text-xs font-mono text-primary-gold">{value}px</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-gold"
            />
        </div>
    )

    const handleSave = async () => {
        setIsSaving(true)

        try {
            const result = await updateLogoConfig(config)
            if (result.success) {
                setSaved(true)
                setTimeout(() => setSaved(false), 2000)
                // Trigger a page reload to apply changes to Navbar
                window.location.reload()
            }
        } catch (e) {
            console.error('Error saving logo config:', e)
        }

        setIsSaving(false)
    }

    const handleLogoUpload = (url: string) => {
        setConfig({ ...config, logoUrl: url })
    }

    const canvasWidth = previewMode === 'desktop' ? 800 : 360
    const canvasHeight = previewMode === 'desktop' ? 450 : 640

    return (
        <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">
            {/* Controls Panel */}
            <div className="lg:col-span-4 glass-panel p-8 overflow-y-auto">
                <h3 className="text-xl font-display font-bold mb-6">Logo Ayarları</h3>

                {/* Logo Upload */}
                <div className="mb-8">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3 block">Logo Görseli</label>
                    <FileUpload
                        folder="logos"
                        accept="image/*"
                        maxSize={10}
                        currentUrl={config.logoUrl || undefined}
                        onUpload={handleLogoUpload}
                    />
                    {config.logoUrl && (
                        <p className="text-xs text-green-400 mt-2">✓ Logo yüklendi</p>
                    )}
                </div>

                <div className="border-t border-white/10 pt-6">
                    <h4 className="text-sm font-bold text-white/60 mb-4">Boyut & Konum</h4>

                    <SimpleSlider
                        label="Genişlik"
                        value={config.width}
                        min={50}
                        max={300}
                        onChange={(v: number) => setConfig({ ...config, width: v })}
                    />
                    <SimpleSlider
                        label="Yükseklik"
                        value={config.height}
                        min={20}
                        max={150}
                        onChange={(v: number) => setConfig({ ...config, height: v })}
                    />
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 block">Görünürlük</label>
                    <div className="space-y-3">
                        {['home', 'portfolio', 'packages', 'all'].map(page => (
                            <label key={page} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded border ${config.visibility.includes(page) ? 'bg-primary-gold border-primary-gold' : 'border-white/20'} flex items-center justify-center transition-colors`}>
                                    {config.visibility.includes(page) && <div className="w-2 h-2 bg-black rounded-full" />}
                                </div>
                                <span className="text-sm text-white/60 group-hover:text-white transition-colors capitalize">{page === 'all' ? 'Tüm Sayfalar' : page}</span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={config.visibility.includes(page)}
                                    onChange={(e) => {
                                        if (e.target.checked) setConfig({ ...config, visibility: [...config.visibility, page] })
                                        else setConfig({ ...config, visibility: config.visibility.filter((p: string) => p !== page) })
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full mt-8 btn-premium flex items-center justify-center gap-3"
                >
                    {saved ? <Check size={18} /> : isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    {saved ? 'Kaydedildi!' : isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
            </div>

            {/* Live Preview Canvas */}
            <div className="lg:col-span-8 glass-panel p-8 flex flex-col items-center justify-center bg-black/40 relative overflow-hidden">
                {/* Device Toggle */}
                <div className="absolute top-6 right-6 flex bg-white/5 rounded-lg p-1">
                    <button
                        onClick={() => setPreviewMode('desktop')}
                        className={`p-2 rounded-md transition-all ${previewMode === 'desktop' ? 'bg-white/10 text-primary-gold' : 'text-white/40 hover:text-white'}`}
                    >
                        <Monitor size={18} />
                    </button>
                    <button
                        onClick={() => setPreviewMode('mobile')}
                        className={`p-2 rounded-md transition-all ${previewMode === 'mobile' ? 'bg-white/10 text-primary-gold' : 'text-white/40 hover:text-white'}`}
                    >
                        <Smartphone size={18} />
                    </button>
                </div>

                <div
                    className="relative bg-[#030712] border border-white/10 shadow-2xl transition-all duration-500 overflow-hidden rounded-lg"
                    style={{ width: Math.min(canvasWidth, 700), height: Math.min(canvasHeight, 400) }}
                >
                    {/* Grid for reference */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />

                    {/* Navbar simulation */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-sm border-b border-white/10 flex items-center px-6">
                        {/* The Logo */}
                        <div
                            className="relative"
                            style={{
                                width: config.width * 0.5,
                                height: config.height * 0.5,
                            }}
                        >
                            {config.logoUrl ? (
                                <img
                                    src={config.logoUrl}
                                    alt="Logo Preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/10 rounded flex items-center justify-center text-white/30 text-xs">
                                    LOGO
                                </div>
                            )}
                        </div>

                        {/* Fake nav items */}
                        <div className="ml-auto flex gap-4">
                            <div className="w-12 h-2 bg-white/20 rounded"></div>
                            <div className="w-12 h-2 bg-white/20 rounded"></div>
                            <div className="w-12 h-2 bg-white/20 rounded"></div>
                        </div>
                    </div>

                    {/* Dummy Content */}
                    <div className="absolute inset-0 pointer-events-none p-6 pt-24 opacity-30">
                        <div className="h-8 w-1/3 bg-white/10 rounded mb-4" />
                        <div className="h-4 w-2/3 bg-white/5 rounded mb-2" />
                        <div className="h-4 w-1/2 bg-white/5 rounded mb-2" />
                        <div className="h-4 w-3/4 bg-white/5 rounded" />
                    </div>
                </div>

                <p className="mt-6 text-xs text-white/20 uppercase tracking-widest">Canlı Önizleme ({previewMode})</p>
            </div>
        </div>
    )
}
