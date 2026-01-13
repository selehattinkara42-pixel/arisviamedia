'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function PortfolioSection({ items }: { items: any[] }) {
    const showcaseItems = items.length > 0 ? items : [
        { id: 1, title: "Elite Motors", category: "Marka Kimliği", mediaUrl: null },
        { id: 2, title: "Skyline Residence", category: "Web Tasarım", mediaUrl: null },
        { id: 3, title: "Aurora Fashion", category: "E-Ticaret", mediaUrl: null },
        { id: 4, title: "TechVision AI", category: "Ürün Tasarım", mediaUrl: null },
        { id: 5, title: "Gastro Lab", category: "Sosyal Medya", mediaUrl: null },
        { id: 6, title: "Urban Architects", category: "Web Tasarım", mediaUrl: null }
    ]

    return (
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
                    {showcaseItems.slice(0, 6).map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-primary-bronze/10"
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
            </div>
        </section>
    )
}
