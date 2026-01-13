import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Box, Menu, X, MessageSquare, ChevronRight } from 'lucide-react'
import MagneticLink from './MagneticLink'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const isAdminPage = location.pathname === '/admin'

    const navLinks = [
        { name: 'Anasayfa', path: '/' },
        { name: 'Hakkımızda', path: '/hakkimizda' },
        { name: 'Hizmetler', path: '/hizmetler' },
        { name: 'Portfolyo', path: '/portfolyo' },
        { name: 'Referanslar', path: '/referanslar' },
        { name: 'Paketler', path: '/paketler' },
    ]

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] w-full max-w-7xl px-6">
            <div className="glass-panel px-8 py-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/5 bg-black/40 backdrop-blur-3xl rounded-3xl relative">
                <Link to="/">
                    <motion.div
                        className="flex items-center gap-3 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-gold to-primary-bronze rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            <Box className="text-black w-6 h-6" />
                        </div>
                        <span className="font-display font-extrabold text-xl tracking-tighter uppercase italic">
                            Aris <span className="text-primary-gold">Via</span>
                        </span>
                    </motion.div>
                </Link>

                {/* Masaüstü Menü */}
                {!isAdminPage && (
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <MagneticLink key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-primary-gold relative group ${location.pathname === link.path ? 'text-primary-gold' : 'text-white/40'}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 h-px bg-primary-gold transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </Link>
                            </MagneticLink>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Link to="/iletisim">
                        <motion.button
                            whileHover={{ scale: 1.05, shadow: "0 0 20px rgba(212,175,55,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-premium py-2 px-6 text-[10px] flex items-center gap-2"
                        >
                            <MessageSquare size={14} />
                            Bize Ulaşın
                        </motion.button>
                    </Link>

                    {/* Mobil Menü Butonu */}
                    {!isAdminPage && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-10 h-10 glass-panel flex items-center justify-center text-white border-white/10"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    )}
                </div>

                {/* Mobil Menü Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="absolute top-full left-0 right-0 mt-4 glass-panel p-8 bg-black/80 backdrop-blur-3xl border-white/10 overflow-hidden lg:hidden"
                        >
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between text-lg font-display font-bold text-white/70 hover:text-primary-gold transition-colors group"
                                    >
                                        {link.name}
                                        <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary-gold/10 blur-[60px] rounded-full pointer-events-none" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar
