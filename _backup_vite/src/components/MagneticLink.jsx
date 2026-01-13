import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MagneticLink = ({ children, className }) => {
    const ref = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouse = (e) => {
        const { clientX, clientY } = e
        const rect = ref.current.getBoundingClientRect()
        const x = clientX - (rect.left + rect.width / 2)
        const y = clientY - (rect.top + rect.height / 2)
        setPosition({ x: x * 0.3, y: y * 0.3 })
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default MagneticLink
