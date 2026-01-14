'use client'

import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import Link from 'next/link'
import { PageContentData } from '@/app/actions/content'

type ReferenceItem = {
    id: number
    name: string
    logoUrl?: string | null
    category: string
}

type ReferencesContent = {
    title: PageContentData | null
}

export default function ReferencesSectionClient({ items, content }: { items: ReferenceItem[], content: ReferencesContent }) {
    // If no items, show placeholder
    if (items.length === 0) {
        return null
    }

    // Duplicate items for infinite scroll effect
    const duplicatedItems = [...items, ...items, ...items]

    const getSize = (size?: string, defaultSize = 'text-base') => {
        if (!size) return defaultSize
        return size.startsWith('text-') ? size : `text-${size}`
    }

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-gold/5 to-transparent" />

            <div className="container mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary-gold mb-4">Güvenilir İş Ortaklarımız</h2>
                    <p className={`font-display font-bold ${getSize(content.title?.fontSize, 'text-4xl')}`}>
                        {content.title?.content || 'REFERANSLARIMIZ'}
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                {/* Scrolling Row */}
                <motion.div
                    className="flex gap-8 py-8"
                    animate={{
                        x: [0, -50 * items.length * 3],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: items.length * 5,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedItems.map((item, index) => (
                        <motion.div
                            key={`${item.id}-${index}`}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="flex-shrink-0 w-40 h-24 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center p-4 cursor-pointer group transition-all hover:border-primary-gold/50 hover:bg-white/10"
                        >
                            {item.logoUrl ? (
                                <img
                                    src={item.logoUrl}
                                    alt={item.name}
                                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            ) : (
                                <div className="text-center">
                                    <Building2 size={28} className="mx-auto text-white/30 group-hover:text-primary-gold transition-colors" />
                                    <span className="text-xs text-white/50 mt-1 block truncate">{item.name}</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <Link href="/referanslar">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 rounded-full border border-white/20 text-white/60 hover:border-primary-gold hover:text-primary-gold transition-all text-sm font-bold tracking-widest uppercase"
                    >
                        Tümünü Gör
                    </motion.button>
                </Link>
            </div>
        </section>
    )
}
