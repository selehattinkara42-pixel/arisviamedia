'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e
            if (dotRef.current && ringRef.current) {
                dotRef.current.style.left = `${clientX}px`
                dotRef.current.style.top = `${clientY}px`
                ringRef.current.style.left = `${clientX}px`
                ringRef.current.style.top = `${clientY}px`
            }
        }

        const handleMouseEnter = () => {
            if (dotRef.current && ringRef.current) {
                dotRef.current.style.transform = 'translate(-50%, -50%) scale(2)'
                ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
                ringRef.current.style.borderColor = 'rgba(201, 162, 39, 0.6)'
            }
        }

        const handleMouseLeave = () => {
            if (dotRef.current && ringRef.current) {
                dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
                ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
                ringRef.current.style.borderColor = 'rgba(201, 162, 39, 0.4)'
            }
        }

        document.addEventListener('mousemove', moveCursor)

        const interactiveElements = document.querySelectorAll('a, button')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter)
            el.addEventListener('mouseleave', handleMouseLeave)
        })

        return () => {
            document.removeEventListener('mousemove', moveCursor)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter)
                el.removeEventListener('mouseleave', handleMouseLeave)
            })
        }
    }, [])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null
    }

    return (
        <>
            <div
                ref={dotRef}
                className="cursor-dot hidden lg:block"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
            <div
                ref={ringRef}
                className="cursor-ring hidden lg:block"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
        </>
    )
}
