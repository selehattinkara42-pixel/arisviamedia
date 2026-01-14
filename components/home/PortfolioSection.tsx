'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Play } from 'lucide-react'
import Link from 'next/link'
import VideoPlayer from '@/components/ui/VideoPlayer'
import OptimizedImage from '@/components/ui/OptimizedImage'

type PortfolioItem = {
    id: number
    title: string
    description?: string
    category: string
    mediaUrl?: string | null
}

const isVideo = (url?: string | null) => {
    if (!url) return false
    return /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(url)
}

export default function PortfolioSection({ items, showAll = false }: { items: PortfolioItem[], showAll?: boolean }) {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

    const showcaseItems = items.length > 0 ? items : []

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
                        {displayItems.map((item, i) => {
                            const isItemVideo = isVideo(item.mediaUrl)

                            return (
                                <motion.div
                                    key={item.id}
                                    layoutId={`portfolio-${item.id}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedItem(item)}
                                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-white/5"
                                >
                                    {/* Media Layer */}
                                    {isItemVideo ? (
                                        <div className="w-full h-full relative">
                                            <video
                                                src={item.mediaUrl!}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                                muted
                                                loop
                                                playsInline
                                                onMouseOver={e => e.currentTarget.play().catch(() => { })}
                                                onMouseOut={e => {
                                                    e.currentTarget.pause()
                                                    e.currentTarget.currentTime = 0
                                                }}
                                            />
                                            {/* Video Indicator */}
                                            <div className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                                                <Play size={12} fill="white" className="ml-0.5" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-700">
                                            {item.mediaUrl && (
                                                <OptimizedImage
                                                    src={item.mediaUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            )}
                                        </div>
                                    )}

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                                    {/* Content */}
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
                            )
                        })}
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
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            layoutId={`portfolio-${selectedItem.id}`}
                            className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col md:flex-row shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
                            >
                                <X size={20} />
                            </button>

                            {/* Image/Video Side */}
                            <div className="w-full md:w-[60%] bg-black relative flex items-center justify-center bg-grid-pattern overflow-hidden">
                                {isVideo(selectedItem.mediaUrl) ? (
                                    <div className="w-full aspect-video">
                                        <VideoPlayer
                                            src={selectedItem.mediaUrl!}
                                            autoPlay={true}
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full min-h-[300px] md:min-h-[500px] relative">
                                        {selectedItem.mediaUrl && (
                                            <>
                                                {/* Main Image */}
                                                <div className="relative w-full h-full z-10">
                                                    <OptimizedImage
                                                        src={selectedItem.mediaUrl}
                                                        alt={selectedItem.title}
                                                        fill
                                                        className="object-contain"
                                                        priority
                                                    />
                                                </div>

                                                {/* Blurred Background for ambiance */}
                                                <div className="absolute inset-0 z-0 opacity-30 blur-3xl scale-110">
                                                    <OptimizedImage
                                                        src={selectedItem.mediaUrl}
                                                        alt={selectedItem.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-[40%] p-8 md:p-12 overflow-y-auto max-h-[50vh] md:max-h-full bg-gradient-to-b from-[#0a0a0a] to-black">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-gold/10 text-primary-gold text-xs font-bold uppercase tracking-widest mb-6 border border-primary-gold/20">
                                        {selectedItem.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                                        {selectedItem.title}
                                    </h2>
                                    <p className="text-white/60 text-base leading-relaxed mb-8 font-light">
                                        {selectedItem.description || 'Bu proje için detaylı açıklama yakında eklenecektir.'}
                                    </p>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setSelectedItem(null)}
                                            className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors"
                                        >
                                            Kapat
                                        </button>

                                        <Link href="/iletisim">
                                            <button className="btn-premium px-8 py-3 text-sm">
                                                Benzer Proje Başlat
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
