import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import {
    ArrowUpRight, Play, Zap, Shield, Sparkles,
    ArrowRight, Box, Camera, Globe
} from 'lucide-react'
import MagneticLink from '../components/MagneticLink'
import InfiniteMarquee from '../components/InfiniteMarquee'

const LandingPage = () => {
    return (
        <PageTransition>
            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
                {/* Hero Section */}
                <section className="grid lg:grid-cols-2 gap-16 items-center mb-60">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-primary-gold font-display font-bold tracking-[0.3em] uppercase mb-4 text-glow text-xs">
                                Mükemmelliğin Ötesinde <span className="text-white/20">|</span> 2026
                            </h2>
                            <h1 className="hero-title mb-8">
                                DİJİTAL <br />
                                <motion.span
                                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold via-white to-primary-bronze italic inline-block"
                                >
                                    SANAT
                                </motion.span>
                            </h1>
                            <p className="text-xl text-white/50 max-w-md mb-12 leading-relaxed font-body italic">
                                Aris Via Media, estetiği teknolojiyle, lüksü inovasyonla harmanlayarak "kusursuzun ötesi" dijital deneyimler tasarlar.
                            </p>

                            <div className="flex flex-wrap items-center gap-6">
                                <MagneticLink>
                                    <Link to="/iletisim">
                                        <motion.button
                                            whileHover={{ scale: 1.05, shadow: "0 0 30px rgba(212,175,55,0.3)" }}
                                            className="btn-premium text-lg px-12 py-5"
                                        >
                                            Yolculuğa Başla
                                        </motion.button>
                                    </Link>
                                </MagneticLink>

                                <MagneticLink>
                                    <button
                                        className="flex items-center gap-3 font-semibold hover:text-primary-gold transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary-gold transition-colors">
                                            <Play className="fill-white group-hover:fill-primary-gold ml-1" size={14} />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Hikayemizi İzle</span>
                                    </button>
                                </MagneticLink>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-8 mt-24">
                            {[
                                { label: 'Global Vizyon', val: '01' },
                                { label: 'Elit Portfolyo', val: '02' },
                                { label: 'Sınırsız İnovasyon', val: '03' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 + i * 0.2 }}
                                    className="flex flex-col gap-1"
                                >
                                    <span className="text-4xl font-display font-bold text-white group-hover:text-primary-gold transition-colors">{stat.val}</span>
                                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 font-bold">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[600px] hidden lg:flex items-center justify-center perspective-1000">
                        <FloatingCard
                            icon={<Zap className="text-primary-gold" />}
                            title="Hızlı Büyüme"
                            desc="Veriye dayalı stratejilerle markanızı ışık hızında zirveye taşıyoruz."
                            pos="top-0 right-10"
                            active
                        />
                        <FloatingCard
                            icon={<Shield className="text-accent-cyan" />}
                            title="Güvenilir Mimari"
                            desc="Sürdürülebilir başarı için sarsılmaz bir temel inşa ediyoruz."
                            pos="top-1/3 left-20"
                            delay={2}
                        />
                        <FloatingCard
                            icon={<Sparkles className="text-accent-purple" />}
                            title="Sınırsız Estetik"
                            desc="Her pikselde lüksü ve kaliteyi hissedeceğiniz vizyoner dünyalar."
                            pos="bottom-10 right-0"
                            delay={1}
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-gold/5 blur-[150px] rounded-full animate-pulse-slow -z-10" />
                    </div>
                </section>

                <InfiniteMarquee
                    items={["STRATEJİ", "PRODÜKSİYON", "ESTETİK", "İNOVASYON", "VİZYON", "KREATİF"]}
                    speed={30}
                />

                {/* Hizmetler Teaser */}
                <section className="my-60">
                    <div className="flex justify-between items-end mb-20">
                        <div>
                            <h2 className="text-primary-gold font-display font-bold tracking-[0.3em] uppercase mb-4 text-xs">Ayrıcalıklı Çözümler</h2>
                            <h3 className="text-6xl font-display font-bold italic title-contain">NELER YAPIYORUZ?</h3>
                        </div>
                        <Link to="/hizmetler" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-primary-gold">
                            Tümünü Gör <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TeaserBox
                            icon={<Camera />}
                            title="SİNEMATİK PRODÜKSİYON"
                            path="/hizmetler"
                        />
                        <TeaserBox
                            icon={<Box />}
                            title="BRANDING & KİMLİK"
                            path="/hizmetler"
                        />
                        <TeaserBox
                            icon={<Globe />}
                            title="INTERAKTIF WEB"
                            path="/hizmetler"
                        />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="glass-panel p-20 text-center relative overflow-hidden mb-20">
                    <div className="relative z-10">
                        <motion.h2
                            whileInView={{ scale: [0.9, 1.05, 1], rotate: [0, 2, 0] }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-8 italic title-contain"
                        >
                            PROJENİZİ <span className="text-primary-gold">ATEŞLEYİN</span>
                        </motion.h2>
                        <p className="text-white/40 max-w-xl mx-auto mb-12 text-lg italic">
                            Sıradan bir ajans değil, markanızın geleceğini inşa eden bir partner arıyorsanız doğru yerdesiniz.
                        </p>
                        <Link to="/iletisim">
                            <button className="btn-premium px-16 py-6 text-xl">TEKLİF ALIN</button>
                        </Link>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-gold/10 via-transparent to-accent-cyan/5 -z-10 animate-pulse-slow" />
                </section>

                {/* Footer Teaser */}
                <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-gold rounded flex items-center justify-center">
                            <Box size={16} className="text-black" />
                        </div>
                        <span className="font-display font-bold uppercase italic tracking-tighter">Aris Via <span className="text-primary-gold">Media</span></span>
                    </div>
                    <div className="flex gap-12 text-[10px] font-bold uppercase tracking-widest text-white/20">
                        <Link to="/hakkimizda" className="hover:text-primary-gold transition-colors">HAKKIMIZDA</Link>
                        <Link to="/referanslar" className="hover:text-primary-gold transition-colors">REFERANSLAR</Link>
                        <Link to="/portfolyo" className="hover:text-primary-gold transition-colors">PORTFOLYO</Link>
                    </div>
                    <p className="text-white/10 text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 ARİS VİA. ALL RIGHTS RESERVED.</p>
                </footer>
            </div>
        </PageTransition>
    )
}

const FloatingCard = ({ icon, title, pos, delay = 0, active = false, desc }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [10, -10])
    const rotateY = useTransform(x, [-100, 100], [-10, 10])

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect()
        const mouseX = event.clientX - rect.left - rect.width / 2
        const mouseY = event.clientY - rect.top - rect.height / 2
        x.set(mouseX)
        y.set(mouseY)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + delay * 0.1, duration: 1 }}
            style={{ x: x.get() * 0.05, y: y.get() * 0.05 }}
            className={`absolute ${pos} w-72 floating${delay ? '-delayed' : ''} group z-20`}
        >
            <motion.div
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, perspective: 1000 }}
                className={`glass-panel p-8 rotate-hover shadow-2xl ${active ? 'border-primary-gold/30' : 'border-white/5'} cursor-pointer bg-black/20 backdrop-blur-3xl`}
            >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-gradient-to-br from-white/10 to-transparent">
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary-gold transition-colors font-display tracking-tight">{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6 font-medium italic">
                    {desc}
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">CORE ENGINE</span>
                    <ArrowUpRight className="text-white/10 group-hover:text-primary-gold transition-colors" size={16} />
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] pointer-events-none blur-3xl -z-10" />
            </motion.div>
        </motion.div>
    )
}

const TeaserBox = ({ icon, title, path }) => (
    <Link to={path}>
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-panel p-10 group cursor-pointer border-white/5 hover:border-primary-gold/20"
        >
            <div className="text-primary-gold mb-6 group-hover:scale-110 transition-transform">{React.cloneElement(icon, { size: 40 })}</div>
            <h4 className="text-xl font-display font-bold mb-4 tracking-tighter italic">{title}</h4>
            <p className="text-xs text-white/20 uppercase tracking-widest font-bold flex items-center gap-2 group-hover:text-white transition-colors">
                DETAYLARI İNCELE <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </p>
        </motion.div>
    </Link>
)

const ChevronRight = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m9 18 6-6-6-6" />
    </svg>
)

export default LandingPage
