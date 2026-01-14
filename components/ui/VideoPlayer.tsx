'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

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
    muted = false // Normalde sesli başlamalı, autoplay gerekirse sessize alırız
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isMuted, setIsMuted] = useState(muted)
    const [isLoading, setIsLoading] = useState(true)
    const [showControls, setShowControls] = useState(false)
    const [duration, setDuration] = useState(0)

    // Reset state when src changes
    useEffect(() => {
        setIsLoading(true)
        setProgress(0)
        setIsPlaying(false)
        setDuration(0)
    }, [src])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (autoPlay) {
            // Autoplay girişimi
            const playPromise = video.play()

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true)
                    })
                    .catch(() => {
                        // Autoplay engellendiyse sessize alıp tekrar dene
                        console.log("Autoplay with sound blocked, trying muted...")
                        video.muted = true
                        setIsMuted(true)
                        video.play()
                            .then(() => setIsPlaying(true))
                            .catch(e => console.error("Autoplay failed completely:", e))
                    })
            }
        }
    }, [autoPlay, src])

    const togglePlay = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play()
                setIsPlaying(true)
            } else {
                videoRef.current.pause()
                setIsPlaying(false)
            }
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
            setIsLoading(false)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime
            const total = videoRef.current.duration || duration
            if (total > 0) {
                setProgress((current / total) * 100)
            }
        }
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (videoRef.current) {
            const progressBar = e.currentTarget
            const rect = progressBar.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percentage = Math.max(0, Math.min(1, x / rect.width))
            videoRef.current.currentTime = percentage * (videoRef.current.duration || duration)
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
            className={`relative group bg-black overflow-hidden flex items-center justify-center ${className}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-contain" // object-contain video oranını bozmaz
                loop={loop}
                muted={isMuted}
                playsInline
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onWaiting={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                onPlaying={() => {
                    setIsLoading(false)
                    setIsPlaying(true)
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-10 pointer-events-none">
                    <Loader2 className="w-12 h-12 text-primary-gold animate-spin" />
                </div>
            )}

            {/* Play/Pause Overlay Icon (Center) */}
            {!isLoading && (showControls || !isPlaying) && (
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
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Progress Bar */}
                    <div
                        className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative group/progress transition-all hover:h-2"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-primary-gold rounded-full transition-all duration-100 relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="hover:text-primary-gold text-white transition-colors">
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>

                            <button onClick={toggleMute} className="hover:text-primary-gold text-white transition-colors">
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>

                            <span className="text-xs text-white/80 font-mono font-medium tracking-wide">
                                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
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
    if (isNaN(seconds) || seconds === Infinity) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
