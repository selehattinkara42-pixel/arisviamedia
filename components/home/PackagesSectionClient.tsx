'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { PageContentData } from '@/app/actions/content'

type PackagesContent = {
    title: PageContentData | null
    subtitle: PageContentData | null
}

export default function PackagesSectionClient({ items, content }: { items: any[], content: PackagesContent }) {
    const packages = items.length > 0 ? items : []
    const icons = [Zap, Crown, Sparkles]

    if (packages.length === 0) return null

    // Helper to get text size class
    const getSize = (size?: string, defaultSize = 'text-base') => {
        if (!size) return defaultSize
        return size.startsWith('text-') ? size : `text-${size}`
    }

    return (
        <section className="py-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className={`font-bold uppercase tracking-[0.3em] text-primary-gold mb-4 ${getSize(content.subtitle?.fontSize, 'text-xs')}`}>
                        {content.subtitle?.content || 'Fiyatlandırma'}
                    </h2>
                    <p className={`font-display font-bold ${getSize(content.title?.fontSize, 'text-4xl md:text-5xl')}`}>
                        {content.title?.content || 'SİZE UYGUN PLAN'}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {packages.slice(0, 3).map((pkg, i) => {
                        const Icon = icons[i] || Zap
                        const isPopular = pkg.badge === "En Popüler"

                        return (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass-card p-8 relative ${isPopular ? 'border-primary-gold/50' : ''}`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-gold text-black text-xs font-bold uppercase rounded-full">
                                        {pkg.badge}
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${isPopular ? 'bg-primary-gold' : 'bg-white/10'}`}>
                                    <Icon className={isPopular ? 'text-black' : 'text-white'} size={24} />
                                </div>

                                <h3 className="text-xl font-display font-bold mb-2">{pkg.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-3xl font-bold text-primary-gold">
                                        ₺{parseFloat(pkg.price).toLocaleString('tr-TR')}
                                    </span>
                                    <span className="text-white/30 text-sm">/proje</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {(pkg.features || []).map((feature: string, fIndex: number) => (
                                        <li key={fIndex} className="flex items-center gap-3 text-sm text-white/60">
                                            <Check className="w-4 h-4 text-primary-gold" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/iletisim">
                                    <button className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all ${isPopular
                                        ? 'btn-premium'
                                        : 'bg-white/10 hover:bg-white/20 text-white'
                                        }`}>
                                        Başlayın
                                    </button>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
