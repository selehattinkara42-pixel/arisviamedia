import React from 'react'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'
import { Check, ShieldCheck, Zap, Sparkles, Building2 } from 'lucide-react'

const PackagesPage = () => {
    return (
        <PageTransition>
            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <header className="mb-32 text-center">
                    <h1 className="hero-title mb-8 italic tracking-tighter">PAKETLERİMİZ</h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
                        Markanızın dijital varlığını sürdürülebilir bir başarıya dönüştürmek için optimize edilmiş aylık yönetim planları.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8 items-start mb-40">
                    <PricingCard
                        icon={<Zap />}
                        tier="Başlangıç"
                        price="4.500"
                        color="primary-gold"
                        features={[
                            '12 Profesyonel Post Tasarımı',
                            '4 Sinematik Reel Videosu',
                            'Haftalık Story Akışları',
                            'Temel Performans Analizi',
                            'Aylık Planlama Toplantısı'
                        ]}
                    />
                    <PricingCard
                        icon={<Sparkles />}
                        tier="Profesyonel"
                        price="8.500"
                        featured
                        color="accent-cyan"
                        features={[
                            '24 Profesyonel Post Tasarımı',
                            '12 Sinematik Reel Videosu',
                            'Günlük Story Akışı',
                            'Gelişmiş Reklam Yönetimi',
                            'Detaylı Ay Sonu Raporlama',
                            'Rakip Analiz & Strateji'
                        ]}
                    />
                    <PricingCard
                        icon={<Building2 />}
                        tier="Kurumsal"
                        price="15.000"
                        color="accent-purple"
                        features={[
                            'Sınırsız Grafik İçerik',
                            'Haftalık Profesyonel Çekim',
                            'Sinematik Kurgu ve Montaj',
                            'Influencer İşbirlikleri',
                            '7/24 Öncelikli Destek',
                            'Gelişmiş Kriz Yönetimi'
                        ]}
                    />
                </div>

                {/* Ek Bilgi */}
                <section className="glass-panel p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <ShieldCheck className="text-primary-gold w-16 h-16 mx-auto mb-8" />
                        <h2 className="text-3xl font-display font-bold mb-4 uppercase tracking-[0.2em]">ÖZELLEŞTİRİLMİŞ ÇÖZÜMLER</h2>
                        <p className="text-white/40 max-w-xl mx-auto mb-10">
                            Hiçbir marka birbirinin aynısı değildir. İhtiyaçlarınıza özel, butik bir yönetim paketi oluşturmak için bizimle iletişime geçebilirsiniz.
                        </p>
                        <button className="btn-premium px-10">DANIŞMANLIK ALIN</button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-gold/5 via-transparent to-transparent pointer-events-none" />
                </section>
            </div>
        </PageTransition>
    )
}

const PricingCard = ({ icon, tier, price, features, featured = false, color }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className={`glass-panel p-12 flex flex-col h-full relative overflow-hidden transition-all duration-500 ${featured ? 'border-primary-gold/40 ring-1 ring-primary-gold/20 scale-105 z-10' : 'border-white/5 opacity-80 hover:opacity-100'}`}
    >
        {featured && (
            <div className="absolute top-0 right-0 bg-primary-gold text-black text-[10px] font-bold px-6 py-2 rounded-bl-2xl uppercase tracking-[0.3em]">
                EN POPÜLER
            </div>
        )}

        <div className={`w-16 h-16 rounded-2xl bg-${color}/10 border border-${color}/20 flex items-center justify-center text-${color} mb-12`}>
            {React.cloneElement(icon, { size: 32 })}
        </div>

        <div className="mb-12">
            <h4 className="text-white/30 uppercase tracking-[0.4em] text-xs font-bold mb-4">{tier}</h4>
            <div className="flex items-baseline gap-2">
                <span className="text-5xl font-display font-extrabold text-white">₺{price}</span>
                <span className="text-white/20 text-sm font-bold tracking-widest uppercase italic">/ ay</span>
            </div>
        </div>

        <div className="space-y-6 mb-16 flex-grow">
            {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4 text-sm text-white/50 group">
                    <Check size={16} className={`text-${color} shrink-0`} />
                    <span className="group-hover:text-white transition-colors">{f}</span>
                </div>
            ))}
        </div>

        <button className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] transition-all duration-500 ${featured ? 'bg-primary-gold text-black shadow-[0_15px_40px_rgba(212,175,55,0.3)] hover:scale-[1.02]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
            Yolculuğa Başla
        </button>
    </motion.div>
)

export default PackagesPage
