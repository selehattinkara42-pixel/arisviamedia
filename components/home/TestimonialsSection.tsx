'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function TestimonialsSection({ items }: { items: any[] }) {
    const testimonials = items.length > 0 ? items : [
        { id: 1, name: "Ahmet Yılmaz", role: "CEO", company: "TechVision", content: "Aris Via ile çalışmak, markamızı tamamen yeni bir seviyeye taşıdı.", rating: 5 },
        { id: 2, name: "Zeynep Kaya", role: "Pazarlama Direktörü", company: "Elite Motors", content: "Dijital dönüşüm sürecimizde en doğru partneri bulduk.", rating: 5 },
        { id: 3, name: "Mehmet Özkan", role: "Kurucu", company: "Skyline", content: "Yaratıcılık ve teknik ustalığın mükemmel birleşimi.", rating: 5 },
    ]

    if (testimonials.length === 0) return null

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary-gold mb-4">Müşteri Görüşleri</h2>
                    <p className="text-4xl md:text-5xl font-display font-bold">BAŞARI HİKAYELERİ</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.slice(0, 3).map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8"
                        >
                            <Quote className="text-primary-gold/20 mb-4" size={32} />
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, starI) => (
                                    <Star
                                        key={starI}
                                        className={`w-4 h-4 ${starI < item.rating ? 'fill-primary-gold text-primary-gold' : 'text-white/10'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-white/70 leading-relaxed mb-6 italic">"{item.content}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-gold/20 flex items-center justify-center">
                                    <span className="font-bold text-primary-gold">{item.name?.charAt(0)}</span>
                                </div>
                                <div>
                                    <div className="font-bold">{item.name}</div>
                                    <div className="text-xs text-white/50">{item.role}, {item.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
