'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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
    priority = false, // eslint-disable-line @typescript-eslint/no-unused-vars
    sizes = undefined // eslint-disable-line @typescript-eslint/no-unused-vars
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    // Güvenli Mod: Next.js Image optimizasyonunu şimdilik devre dışı bırakıp
    // standart <img> etiketi kullanarak görsellerin kesinlikle yüklenmesini sağlıyoruz.
    // Siyah ekran sorununu çözer.

    return (
        <div className={`relative overflow-hidden bg-zinc-900 ${className} ${fill ? 'absolute inset-0' : ''}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 z-10 transition-opacity duration-300">
                    <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
                </div>
            )}

            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white/20">
                    <ImageIcon size={24} className="mb-2" />
                    <span className="text-[10px] uppercase tracking-widest">Görsel Yok</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setError(true)
                        setIsLoading(false)
                    }}
                    style={{
                        position: fill ? 'absolute' : 'relative',
                        width: fill ? '100%' : width,
                        height: fill ? '100%' : height,
                    }}
                />
            )}
        </div>
    )
}
