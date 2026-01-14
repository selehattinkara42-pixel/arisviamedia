'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import Link from 'next/link'

type PortfolioItem = {
    id: number
    title: string
    description?: string
    category: string
    mediaUrl?: string | null
}

export default function PortfolioSection({ items, showAll = false }: { items: PortfolioItem[], showAll?: boolean }) {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

    const showcaseItems = items.length > 0 ? items : [
        { id: 1, title: "Elite Motors", category: "Marka Kimliği", mediaUrl: null },
        { id: 2, title: "Skyline Residence", category: "Web Tasarım", mediaUrl: null },
        { id: 3, title: "Aurora Fashion", category: "E-Ticaret", mediaUrl: null },
        { id: 4, title: "TechVision AI", category: "Ürün Tasarım", mediaUrl: null },
        { id: 5, title: "Gastro Lab", category: "Sosyal Medya", mediaUrl: null },
        { id: 6, title: "Urban Architects", category: "Web Tasarım", mediaUrl: null }
    ]

    const displayItems = showAll ? showcaseItems : showcaseItems.slice(0, 6)

    return (
        <>
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary-gold mb-4">Seçkin İşlerimiz</h2>
                        <p className="text-4xl md:text-5xl font-display font-bold">PORTFOLYO</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayItems.map((item, i) => (
                            <motion.div
                                key={item.id}
                                layoutId={`portfolio-${item.id}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedItem(item)}
                                className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-primary-bronze/10 transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage: item.mediaUrl ? `url(${item.mediaUrl})` : undefined,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <span className="text-xs text-primary-gold uppercase tracking-widest mb-2">{item.category}</span>
                                    <h3 className="text-xl font-display font-bold">{item.title}</h3>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                                        <ExternalLink size={18} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {!showAll && items.length > 6 && (
                        <div className="text-center mt-12">
                            <Link href="/portfolyo">
                                <button className="btn-premium px-8 py-3">Tümünü Gör</button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            layoutId={`portfolio-${selectedItem.id}`}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image Side */}
                                <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br from-primary-gold/30 to-primary-bronze/20"
                                        style={{
                                            backgroundImage: selectedItem.mediaUrl ? `url(${selectedItem.mediaUrl})` : undefined,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />
                                </div>

                                {/* Content Side */}
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <span className="inline-block px-4 py-1 rounded-full bg-primary-gold/20 text-primary-gold text-xs font-bold uppercase tracking-widest mb-6">
                                            {selectedItem.category}
                                        </span>
                                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                                            {selectedItem.title}
                                        </h2>
                                        <p className="text-white/60 text-lg leading-relaxed mb-8">
                                            {selectedItem.description || 'Bu proje için henüz bir açıklama eklenmemiş. Admin panelinden projeyi düzenleyerek detaylı bir açıklama ekleyebilirsiniz.'}
                                        </p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setSelectedItem(null)}
                                                className="btn-premium px-8 py-3"
                                            >
                                                Kapat
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
