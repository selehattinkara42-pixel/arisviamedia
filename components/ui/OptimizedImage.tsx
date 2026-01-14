'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Image as ImageIcon } from 'lucide-react'

interface OptimizedImageProps {
    src: string
    alt: string
    fill?: boolean
    width?: number
    height?: number
    className?: string
    priority?: boolean
    sizes?: string
}

export default function OptimizedImage({
    src,
    alt,
    fill = false,
    width,
    height,
    className = "",
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    // Fallback for blob urls or external urls that might not be configured
    // Next.js Image requires domain config. Since we have hostname: '**', it should work.

    return (
        <div className={`relative overflow-hidden bg-white/5 ${className} ${fill ? 'absolute inset-0' : ''}`}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10"
                    >
                        <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white/20">
                    <ImageIcon size={24} className="mb-2" />
                    <span className="text-[10px] uppercase tracking-widest">Görsel Yüklenemedi</span>
                </div>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    fill={fill}
                    width={!fill ? width : undefined}
                    height={!fill ? height : undefined}
                    className={`object-cover transition-all duration-700 ${isLoading ? 'scale-110 blur-xl opacity-0' : 'scale-100 blur-0 opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setError(true)
                        setIsLoading(false)
                    }}
                    priority={priority}
                    quality={80}
                    sizes={fill ? sizes : undefined}
                />
            )}
        </div>
    )
}
