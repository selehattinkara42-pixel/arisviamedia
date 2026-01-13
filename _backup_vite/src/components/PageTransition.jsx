import React from 'react'
import { motion } from 'framer-motion'

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(20px)' }}
            transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                staggerChildren: 0.1
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    )
}

export default PageTransition
