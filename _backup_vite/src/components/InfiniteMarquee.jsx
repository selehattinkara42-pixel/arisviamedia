import React from 'react'
import { motion } from 'framer-motion'

const InfiniteMarquee = ({ items, speed = 20 }) => {
    return (
        <div className="relative flex overflow-hidden py-10 border-y border-white/5 bg-white/[0.02]">
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex whitespace-nowrap gap-20"
            >
                {[...items, ...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className="text-4xl md:text-6xl font-display font-extrabold text-white/10 uppercase italic tracking-tighter hover:text-primary-gold/40 transition-colors cursor-default"
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

export default InfiniteMarquee
