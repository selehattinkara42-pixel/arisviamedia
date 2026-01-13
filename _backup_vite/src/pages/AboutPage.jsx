import React from 'react'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'
import { Sparkles, Target, Eye, Award } from 'lucide-react'

const AboutPage = () => {
    return (
        <PageTransition>
            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <section className="mb-32">
                    <h1 className="hero-title mb-12">
                        VİZYONUMUZ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold via-white to-primary-bronze">
                            GELECEĞİN ÖTESİ
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed font-body italic border-l-2 border-primary-gold/20 pl-8">
                        "Aris Via Media, sadece bir ajans değil; dijital evrenin estetik ve teknolojiyle yeniden inşa edildiği bir inovasyon merkezidir."
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-12 mb-40">
                    <div className="glass-panel p-12 relative overflow-hidden group">
                        <Target className="text-primary-gold mb-8 w-16 h-16 group-hover:scale-110 transition-transform" />
                        <h2 className="text-4xl font-display font-bold mb-6">MİSYONUMUZ</h2>
                        <p className="text-white/50 leading-relaxed text-lg">
                            Markaların dijital kimliklerini, lüksün ve teknolojinin kusursuz uyumuyla en üst seviyeye taşımak. Geleneksel reklamcılık kalıplarını kırarak, her projede sanatsal bir derinlik yaratmak.
                        </p>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-gold/5 blur-[60px] rounded-full" />
                    </div>

                    <div className="glass-panel p-12 relative overflow-hidden group">
                        <Eye className="text-accent-cyan mb-8 w-16 h-16 group-hover:scale-110 transition-transform" />
                        <h2 className="text-4xl font-display font-bold mb-6">DEĞERLERİMİZ</h2>
                        <p className="text-white/50 leading-relaxed text-lg">
                            Kusursuzluk bir seçenek değil, bizim için temel standarttır. Şeffaflık, inovasyon ve estetik tutkusu, Aris Via'nın DNA'sını oluşturur. Her pikselde mükemmelliği arıyoruz.
                        </p>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-cyan/5 blur-[60px] rounded-full" />
                    </div>
                </div>

                <section className="text-center mb-40">
                    <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
                        <Award className="text-primary-gold" />
                        <span className="text-xs font-bold tracking-[0.3em] uppercase">Küresel Standartlar</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-12">SINIRLARI ZORLAYAN EKİP</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Yaratıcı Zihinler', val: '25+' },
                            { label: 'Yıl Deneyim', val: '10+' },
                            { label: 'Ödüllü Proje', val: '50+' },
                            { label: 'Küresel Marka', val: '100+' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glass-panel p-8"
                            >
                                <span className="block text-4xl font-display font-bold text-primary-gold mb-2">{stat.val}</span>
                                <span className="text-xs uppercase tracking-widest text-white/30">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </PageTransition>
    )
}

export default AboutPage
