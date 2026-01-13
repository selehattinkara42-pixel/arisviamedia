import React from 'react'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'
import {
    Camera, Video, Instagram, Layers, Sparkles,
    BarChart3, Globe, PenTool, Radio
} from 'lucide-react'

const ServicesPage = () => {
    const services = [
        {
            icon: <Instagram size={40} />,
            title: "Sosyal Medya Yönetimi",
            desc: "Markanızın dijital sesini en prestijli şekilde yönetiyor, topluluk bağınızı güçlendiriyoruz.",
            color: "primary-gold"
        },
        {
            icon: <Camera size={40} />,
            title: "Drone ve Havadan Çekim",
            desc: "4K FPV ve sinematik çekimlerle dünyaya farklı bir açıdan bakın.",
            color: "accent-cyan"
        },
        {
            icon: <Video size={40} />,
            title: "Profesyonel Prodüksiyon",
            desc: "Reklam filmlerinden kurumsal tanıtımlara, her karede sanat ve tekniği buluşturuyoruz.",
            color: "accent-purple"
        },
        {
            icon: <Layers size={40} />,
            title: "Kurumsal Kimlik Tasarımı",
            desc: "Markanızın ruhunu yansıtan, akılda kalıcı ve asil görsel dünyalar inşa ediyoruz.",
            color: "primary-gold"
        },
        {
            icon: <Globe size={40} />,
            title: "Web ve Arayüz Deneyimi",
            desc: "Geleceğin estetiğini günümüzün teknolojisiyle birleştiren interaktif deneyimler.",
            color: "accent-cyan"
        },
        {
            icon: <BarChart3 size={40} />,
            title: "Dijital Strateji ve Veri",
            desc: "Tahmine dayalı değil, veriye dayalı büyüme stratejileri ile markanızı ölçekliyoruz.",
            color: "accent-purple"
        }
    ]

    return (
        <PageTransition>
            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <header className="mb-32 text-center">
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="hero-title mb-8"
                    >
                        ÖZEL <span className="text-primary-gold">ÇÖZÜMLER</span>
                    </motion.h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
                        Dijital dünyada iz bırakmak için ihtiyaç duyduğunuz tüm araçları, lüks ve inovasyonla harmanlayarak sunuyoruz.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-panel p-10 group hover:border-primary-gold/30 transition-all duration-500 h-full flex flex-col"
                        >
                            <div className={`text-${service.color} mb-8 group-hover:scale-110 transition-transform origin-left`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-display">{service.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed mb-10 flex-grow">{service.desc}</p>
                            <div className="pt-6 border-t border-white/5">
                                <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-gold hover:text-white transition-colors">
                                    Bilgi Al / Teklif İsteyin
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Süreç Bölümü */}
                <section className="glass-panel p-12 md:p-20 relative overflow-hidden">
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8 italic">ÇALIŞMA <br /> DİSİPLİNİMİZ</h2>
                            <div className="space-y-8">
                                {[
                                    { n: '01', t: 'Analiz', d: 'Markanızın mevcut durumunu ve potansiyelini derinlemesine inceliyoruz.' },
                                    { n: '02', t: 'Konsept', d: 'Size özel, benzersiz ve lüks bir görsel/stratejik dil geliştiriyoruz.' },
                                    { n: '03', t: 'Uygulama', d: 'En son teknolojileri kullanarak projeyi kusursuz bir şekilde hayata geçiriyoruz.' }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-primary-gold font-display font-bold text-xl">{step.n}</span>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{step.t}</h4>
                                            <p className="text-white/40 text-sm">{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-primary-gold/20 to-transparent rounded-[3rem] border border-white/5 flex items-center justify-center p-12">
                                <div className="w-full h-full glass-panel rotate-12 flex items-center justify-center">
                                    <Sparkles className="text-primary-gold w-24 h-24 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary-gold/5 blur-[120px] rounded-full" />
                </section>
            </div>
        </PageTransition>
    )
}

export default ServicesPage
