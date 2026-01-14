'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoPlayerProps {
    src: string
    poster?: string
    autoPlay?: boolean
    controls?: boolean
    className?: string
    loop?: boolean
    muted?: boolean
}

export default function VideoPlayer({
    src,
    poster,
    autoPlay = false,
    controls = true,
    className = "",
    loop = true,
    muted = true // Varsayılan olarak sessiz başlatmak tarayıcı politikaları için daha iyidir
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [progress, setProgress] = useState(0)
    const [isMuted, setIsMuted] = useState(muted)
    const [isLoading, setIsLoading] = useState(true)
    const [showControls, setShowControls] = useState(false)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if (videoRef.current) {
            if (autoPlay) {
                videoRef.current.play().catch(() => {
                    // Otomatik oynatma engellenirse sessize alıp tekrar dene
                    setIsMuted(true)
                    videoRef.current!.muted = true
                    videoRef.current!.play().catch(e => console.log('Autoplay blocked', e))
                })
            }
        }
    }, [autoPlay, src])

    const togglePlay = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime
            const total = videoRef.current.duration
            setProgress((current / total) * 100)
            if (total !== Infinity && !isNaN(total)) {
                setDuration(total)
            }
        }
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (videoRef.current) {
            const progressBar = e.currentTarget
            const rect = progressBar.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percentage = (x / rect.width)
            videoRef.current.currentTime = percentage * videoRef.current.duration
        }
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                videoRef.current.parentElement?.requestFullscreen()
            }
        }
    }

    return (
        <div
            className={`relative group bg-black overflow-hidden ${className}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                loop={loop}
                muted={isMuted} // React state'i ile senkronize
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                onLoadedData={() => setIsLoading(false)}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-10 pointer-events-none">
                    <Loader2 className="w-12 h-12 text-primary-gold animate-spin" />
                </div>
            )}

            {/* Play/Pause Overlay Icon (Center) */}
            {!isLoading && showControls && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
                    >
                        {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
                    </motion.div>
                </div>
            )}

            {/* Custom Controls Bar */}
            {controls && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Progress Bar */}
                    <div
                        className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer relative group/progress"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-primary-gold rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity"
                            style={{ left: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="hover:text-primary-gold text-white transition-colors">
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>

                            <button onClick={toggleMute} className="hover:text-primary-gold text-white transition-colors">
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>

                            <span className="text-xs text-white/60 font-mono">
                                {videoRef.current ? formatTime(videoRef.current.currentTime) : "00:00"} / {formatTime(duration)}
                            </span>
                        </div>

                        <button onClick={toggleFullscreen} className="hover:text-primary-gold text-white transition-colors">
                            <Maximize size={20} />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

function formatTime(seconds: number) {
    if (isNaN(seconds)) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
