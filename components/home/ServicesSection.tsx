'use client'

import { motion } from 'framer-motion'
import { Diamond, Layers, Zap, Globe, Cpu, Palette } from 'lucide-react'

const services = [
    { icon: Diamond, title: "Marka Stratejisi", desc: "Markanızın dijitaldeki duruşunu lüks bir deneyime dönüştürüyoruz." },
    { icon: Layers, title: "Kreatif Prodüksiyon", desc: "Sinematik tanıtım filmleri ve üst düzey görsel içerikler üretiyoruz." },
    { icon: Globe, title: "Web Tasarım & Geliştirme", desc: "Sınırları aşan, ödüllü web arayüzleri tasarlıyor ve geliştiriyoruz." },
    { icon: Zap, title: "Performans Pazarlama", desc: "Veri odaklı stratejilerle doğru kitleye ulaşıyoruz." },
    { icon: Cpu, title: "AI Entegrasyonu", desc: "Yapay zeka destekli otomasyonlarla süreçleri hızlandırıyoruz." },
    { icon: Palette, title: "Kurumsal Kimlik", desc: "Logo, tipografi ve renk paletleriyle marka kimliğinizi inşa ediyoruz." }
]

export default function ServicesSection() {
    return (
        <section className="pt-16 pb-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary-gold mb-4">Uzmanlık Alanlarımız</h2>
                    <p className="text-4xl md:text-5xl font-display font-bold">
                        360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-primary-bronze">DİJİTAL</span> MÜKEMMELLİK
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary-gold/10 flex items-center justify-center mb-6 group-hover:bg-primary-gold/20 transition-colors">
                                <service.icon className="text-primary-gold" size={28} />
                            </div>
                            <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                            <p className="text-white/50 leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
