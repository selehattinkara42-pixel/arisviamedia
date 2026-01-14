'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowLeft } from 'lucide-react'

const links = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler' },
    { name: 'Portfolyo', path: '/portfolyo' },
    { name: 'Paketler', path: '/paketler' },
    { name: 'Referanslar', path: '/referanslar' },
    { name: 'İletişim', path: '/iletisim' },
]

type LogoConfig = {
    logoUrl: string
    width: number
    height: number
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [logoConfig, setLogoConfig] = useState<LogoConfig>({
        logoUrl: '',
        width: 150,
        height: 50
    })
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin')

    // Load logo config from localStorage
    useEffect(() => {
        const loadLogoConfig = () => {
            try {
                const stored = localStorage.getItem('arisvia_logo_config')
                if (stored) {
                    const parsed = JSON.parse(stored)
                    setLogoConfig({
                        logoUrl: parsed.logoUrl || '',
                        width: parsed.width || 150,
                        height: parsed.height || 50
                    })
                }
            } catch (e) {
                console.error('Error loading logo config:', e)
            }
        }

        loadLogoConfig()

        // Listen for logo config updates
        const handleLogoUpdate = () => loadLogoConfig()
        window.addEventListener('logoConfigUpdated', handleLogoUpdate)
        window.addEventListener('storage', handleLogoUpdate)

        return () => {
            window.removeEventListener('logoConfigUpdated', handleLogoUpdate)
            window.removeEventListener('storage', handleLogoUpdate)
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-glass py-4' : 'py-6'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-10 flex items-center">
                        {logoConfig.logoUrl ? (
                            <div
                                style={{
                                    width: logoConfig.width,
                                    height: logoConfig.height,
                                    maxWidth: '200px',
                                    maxHeight: '60px'
                                }}
                                className="relative"
                            >
                                <img
                                    src={logoConfig.logoUrl}
                                    alt="Aris Via Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : (
                            <h1 className="font-display font-bold text-2xl tracking-widest">
                                ARIS <span className="text-primary-gold">VIA</span>
                            </h1>
                        )}
                    </Link>

                    {/* Desktop Navigation */}
                    {!isAdmin && (
                        <nav className="hidden lg:flex items-center gap-8">
                            {links.map((link) => (
                                <Link key={link.path} href={link.path}>
                                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${pathname === link.path
                                        ? 'text-primary-gold'
                                        : 'text-white/60 hover:text-white'
                                        }`}>
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    )}

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        {isAdmin ? (
                            <Link href="/">
                                <button className="btn-premium flex items-center gap-2 px-6">
                                    <ArrowLeft size={16} />
                                    Anasayfa'ya Dön
                                </button>
                            </Link>
                        ) : (
                            <Link href="/iletisim">
                                <button className="btn-premium">
                                    Proje Başlat
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle - Only show if not admin */}
                    {!isAdmin && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && !isAdmin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden flex items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <Link
                                        href={link.path}
                                        className={`text-3xl font-display font-bold ${pathname === link.path ? 'text-primary-gold' : 'text-white/60'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
