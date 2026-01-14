'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { PageContentData } from '@/app/actions/content'
import { HeroCardData } from '@/app/actions/hero'

type HeroContent = {
    titleSmall: PageContentData | null
    titleLarge: PageContentData | null
    description: PageContentData | null
    buttonText: PageContentData | null
}

export default function HeroSectionClient({ content, initialCards }: { content: HeroContent, initialCards: HeroCardData[] }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const visibleCards = initialCards.slice(0, 5)

    // Helper to get font size class
    const getSize = (size?: string, defaultSize = 'text-base') => {
        if (!size) return defaultSize
        return size.startsWith('text-') ? size : `text-${size}`
    }

    return (
        <section className="relative min-h-screen flex items-center pt-20 pb-24 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`text-primary-gold font-display font-bold tracking-[0.3em] uppercase mb-6 text-glow ${getSize(content.titleSmall?.fontSize, 'text-xs')}`}
                        >
                            {content.titleSmall?.content || 'Mükemmelliğin Ötesinde'} <span className="text-white/20">|</span> 2026
                        </motion.h2>

                        <h1 className={`hero-title mb-6 md:mb-8 break-words hyphens-auto ${getSize(content.titleLarge?.fontSize, 'text-4xl md:text-6xl lg:text-7xl')}`}>
                            {content.titleLarge?.content ? (
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold via-white to-primary-bronze italic inline-block w-full">
                                    <span dangerouslySetInnerHTML={{ __html: content.titleLarge.content.replace(/\n/g, '<br/>') }} />
                                </span>
                            ) : (
                                <>
                                    <span className="text-white block sm:inline">DİJİTAL</span>{' '}
                                    <br className="hidden sm:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold via-white to-primary-bronze italic inline-block">
                                        SANAT
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className={`text-white/50 max-w-lg mb-12 leading-relaxed font-body italic ${getSize(content.description?.fontSize, 'text-xl')}`}>
                            {content.description?.content || 'Aris Via Media, estetiği teknolojiyle, lüksü inovasyonla harmanlayarak "kusursuzun ötesi" dijital deneyimler tasarlar.'}
                        </p>

                        <div className="flex flex-wrap items-center gap-8">
                            <Link href="/iletisim">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`btn-premium px-12 py-5 ${getSize(content.buttonText?.fontSize, 'text-lg')}`}
                                >
                                    {content.buttonText?.content || 'Yolculuğa Başla'}
                                </motion.button>
                            </Link>

                            <button className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary-gold transition-colors duration-300">
                                    <Play className="fill-white group-hover:fill-primary-gold ml-1 transition-colors" size={16} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-primary-gold transition-colors">Hikayemizi İzle</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right - Floating Cards */}
                    <div className="hidden lg:flex flex-col items-center justify-center gap-5 relative">
                        {visibleCards.map((card, i) => (
                            <GlassCard
                                key={card.id}
                                icon={card.icon}
                                iconColor={card.iconColor}
                                title={card.title}
                                description={card.description || ''}
                                delay={i}
                                offset={i % 2 === 0 ? -30 : 30}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Gradient Orb - Simplified for performance */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-1/2 h-2/3 bg-gradient-to-b from-primary-gold/10 via-primary-bronze/5 to-transparent blur-[100px] -z-10 pointer-events-none" />
        </section>
    )
}

function GlassCard({
    icon,
    iconColor,
    title,
    description,
    delay = 0,
    offset = 0
}: {
    icon: string
    iconColor: string
    title: string
    description?: string
    delay?: number
    offset?: number
}) {
    // Dynamic Icon Import handling for Lucide
    const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Zap

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
                opacity: 1,
                x: offset,
            }}
            transition={{
                opacity: { duration: 0.4, delay: delay * 0.1 },
                x: { duration: 0.4, delay: delay * 0.1 },
            }}
            whileHover={{
                scale: 1.05,
                y: -10,
            }}
            className="group relative w-72 cursor-pointer"
        >
            {/* Glass background */}
            <div className="relative p-5 rounded-2xl overflow-hidden
                bg-white/[0.04] backdrop-blur-md
                border border-white/[0.1]
                shadow-lg
                transition-all duration-300
                group-hover:bg-white/[0.08]
                group-hover:border-white/[0.2]
            ">
                {/* Content */}
                <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.1]">
                        <IconComponent size={22} style={{ color: iconColor }} />
                    </div>

                    {/* Text */}
                    <div className="flex-grow">
                        <h3 className="font-display font-bold text-base mb-1 
                            text-white group-hover:text-primary-gold transition-colors duration-300">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300 leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Bottom accent line */}
                <div className="mt-4 h-0.5 rounded-full bg-white/5">
                    <div
                        className="h-full rounded-full w-1/4 group-hover:w-full transition-all duration-500"
                        style={{ background: `linear-gradient(90deg, ${iconColor}, ${iconColor}80)` }}
                    />
                </div>
            </div>
        </motion.div>
    )
}
