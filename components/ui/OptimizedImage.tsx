'use client'

import React, { useState, useEffect } from 'react'
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
    const [useStandardImg, setUseStandardImg] = useState(false)

    // Fallback: If image takes too long to load (e.g. 5s), force show or switch to standard img
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading && !error) {
                // If stuck loading, try standard img as fallback
                setUseStandardImg(true)
                setIsLoading(false)
            }
        }, 5000)
        return () => clearTimeout(timer)
    }, [isLoading, error])

    // If next/image errors out, switch to standard img
    const handleError = () => {
        if (!useStandardImg) {
            setUseStandardImg(true)
            setIsLoading(false)
            setError(false) // Reset error to try standard img
        } else {
            setError(true) // Standard img also failed
        }
    }

    return (
        <div className={`relative overflow-hidden bg-zinc-800 ${className} ${fill ? 'absolute inset-0' : ''}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 z-10">
                    <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
                </div>
            )}

            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white/20">
                    <ImageIcon size={24} className="mb-2" />
                    <span className="text-[10px] uppercase tracking-widest">Görsel Yok</span>
                </div>
            ) : useStandardImg ? (
                // Fallback to standard <img> tag
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => setError(true)}
                />
            ) : (
                // Next.js Optimized Image
                <Image
                    src={src}
                    alt={alt}
                    fill={fill}
                    width={!fill ? width : undefined}
                    height={!fill ? height : undefined}
                    className={`object-cover transition-all duration-700 ${isLoading ? 'scale-110 blur-xl' : 'scale-100 blur-0'}`}
                    onLoad={() => setIsLoading(false)}
                    onError={handleError}
                    priority={priority}
                    quality={80}
                    sizes={fill ? sizes : undefined}
                    unoptimized={false} // Default behavior, fallback will handle issues
                />
            )}
        </div>
    )
}
