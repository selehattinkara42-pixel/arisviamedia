import React, { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('a')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

    const springConfig = { damping: 25, stiffness: 150 }
    const cursorX = useSpring(mousePos.x, springConfig)
    const cursorY = useSpring(mousePos.y, springConfig)

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary-gold z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-gold rounded-full z-[9999] pointer-events-none"
                style={{
                    x: mousePos.x,
                    y: mousePos.y,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    )
}

export default CustomCursor
