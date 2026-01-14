'use client'

import { motion } from 'framer-motion'
import { Building2, ExternalLink } from 'lucide-react'
import Link from 'next/link'

type ReferenceItem = {
    id: number
    name: string
    logoUrl?: string | null
    websiteUrl?: string | null
    description?: string | null
    category: string
}

export default function ReferencesPageClient({ items }: { items: ReferenceItem[] }) {
    // Group by category
    const categories = [...new Set(items.map(item => item.category))]

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="hero-title text-5xl md:text-8xl mb-8">
                        ÇALIŞTIĞIMIZ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">MARKALAR</span>
                    </h1>
                    <p className="text-white/40 text-xl max-w-2xl">
                        Türkiyenin ve dünyanın önde gelen markaları ile çalışmaktan gurur duyuyoruz.
                    </p>
                </motion.div>

                {/* Categories */}
                {categories.map((category, catIndex) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.1 }}
                        className="mb-16"
                    >
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary-gold mb-8 flex items-center gap-3">
                            <span className="w-8 h-px bg-primary-gold" />
                            {category}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {items.filter(item => item.category === category).map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                >
                                    <div className="relative glass-panel p-6 flex flex-col items-center text-center h-full border border-transparent transition-all">
                                        {/* Logo */}
                                        <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden mb-4 group-hover:bg-white/10 transition-colors">
                                            {item.logoUrl ? (
                                                <img
                                                    src={item.logoUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain p-3 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            ) : (
                                                <Building2 size={40} className="text-white/20 group-hover:text-primary-gold transition-colors" />
                                            )}
                                        </div>

                                        <h3 className="font-bold text-white mb-1">{item.name}</h3>

                                        {item.description && (
                                            <p className="text-xs text-white/40 mb-3 line-clamp-2">{item.description}</p>
                                        )}

                                        {item.websiteUrl && (
                                            <a
                                                href={item.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-primary-gold/60 hover:text-primary-gold transition-colors mt-auto"
                                            >
                                                <ExternalLink size={12} />
                                                Website
                                            </a>
                                        )}

                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {items.length === 0 && (
                    <div className="text-center py-20">
                        <Building2 size={64} className="mx-auto text-white/10 mb-6" />
                        <p className="text-white/40 text-lg">Henüz referans eklenmemiş.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
