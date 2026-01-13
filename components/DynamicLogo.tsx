'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type LogoConfig = {
    width: number
    height: number
    x: number
    y: number
    visibility: string[]
}

export default function DynamicLogo({ config }: { config: LogoConfig | null }) {
    const pathname = usePathname()

    // Basic routing check to see if logo should be visible
    // 'home' maps to '/', other pages map to their path names loosely
    const currentKey = pathname === '/' ? 'home' : pathname.replace('/', '')
    const shouldShow = config?.visibility.includes(currentKey)

    if (!config || !shouldShow) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed z-50 pointer-events-auto"
            style={{
                left: `${config.x}%`,
                top: `${config.y}%`,
                width: config.width,
                height: config.height,
                marginLeft: `-${config.width / 2}px`, // Center anchor
                marginTop: `-${config.height / 2}px`
            }}
        >
            <Link href="/">
                {/* Uses CSS mask or SVG directly. For now, a text placeholder effectively styled */}
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <h1 className="font-display font-bold text-white tracking-widest text-center leading-none" style={{ fontSize: config.height * 0.4 }}>
                        ARIS <span className="text-primary-gold">VIA</span>
                    </h1>
                    <p className="text-white/40 uppercase tracking-[0.4em]" style={{ fontSize: config.height * 0.15 }}>Media</p>
                </div>
            </Link>
        </motion.div>
    )
}
