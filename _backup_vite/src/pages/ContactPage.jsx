import React from 'react'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'
import {
    Mail, Phone, MapPin, Instagram,
    Linkedin, MessageSquare, ArrowRight, Check
} from 'lucide-react'

const ContactPage = () => {
    return (
        <PageTransition>
            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <header className="mb-32">
                    <h1 className="hero-title mb-8 italic tracking-tighter">İLETİŞİM</h1>
                    <p className="text-white/40 max-w-2xl text-lg leading-relaxed">
                        Geleceğin dijital dünyasında markanızın zirve noktasını belirlemek için bir adım uzağınızdayız.
                        Hikayenizi dinleyelim.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-16 mb-40">
                    {/* Sol Kolon: Bilgiler */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-8">
                            <ContactItem
                                icon={<Mail size={24} />}
                                label="E-POSTA"
                                value="hello@arisviamedia.com"
                            />
                            <ContactItem
                                icon={<Phone size={24} />}
                                label="TELEFON"
                                value="+90 5XX XXX XX XX"
                            />
                            <ContactItem
                                icon={<MapPin size={24} />}
                                label="LOKASYON"
                                value="Antalya, Türkiye"
                            />
                        </div>

                        <div className="glass-panel p-10 border-white/5 relative overflow-hidden group">
                            <h3 className="text-sm font-bold tracking-[0.4em] uppercase text-white/30 mb-8">Takip Edin</h3>
                            <div className="flex gap-6">
                                <SocialLink icon={<Instagram />} href="#" />
                                <SocialLink icon={<Linkedin />} href="#" />
                                <SocialLink icon={<MessageSquare />} href="#" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-gold/5 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* Sağ Kolon: Form */}
                    <div className="lg:col-span-7">
                        <div className="glass-panel p-12 border-white/10 shadow-2xl relative">
                            <h2 className="text-4xl font-display font-bold mb-12">BİZE <span className="text-primary-gold">YAZIN</span></h2>
                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <FormInput label="AD SOYAD" placeholder="Selahattin Kara" />
                                    <FormInput label="E-POSTA" placeholder="hello@domain.com" type="email" />
                                </div>
                                <FormInput label="KONU" placeholder="Proje Detayları" />
                                <div>
                                    <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 mb-4 block">MESAJINIZ</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Fikrinizi bizimle paylaşın..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-primary-gold transition-colors text-white resize-none"
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full btn-premium py-6 flex items-center justify-center gap-4 text-lg"
                                >
                                    GÖNDER <ArrowRight size={24} />
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ - Sıkça Sorulan Sorular (Minik) */}
                <section className="max-w-4xl mx-auto">
                    <h3 className="text-center text-[10px] font-bold tracking-[0.5em] text-white/20 mb-12">SIKÇA SORULAN SORULAR</h3>
                    <div className="space-y-4">
                        {[
                            { q: "Süreç nasıl işliyor?", a: "İlk olarak markanızı analiz ediyor, ardından stratejik bir yol haritası çıkarıyoruz." },
                            { q: "Paketler özelleştirilebilir mi?", a: "Kesinlikle. Her markanın ihtiyacı farklıdır, paketlerimizi size göre butikleştiriyoruz." }
                        ].map((faq, i) => (
                            <div key={i} className="glass-panel p-8 border-white/5">
                                <h4 className="flex items-center gap-4 text-xl font-bold font-display italic mb-4">
                                    <Check size={20} className="text-primary-gold" /> {faq.q}
                                </h4>
                                <p className="text-white/40 leading-relaxed text-sm ml-9">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </PageTransition>
    )
}

const ContactItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-8 group">
        <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center text-primary-gold group-hover:bg-primary-gold group-hover:text-black transition-all duration-500 shadow-inner">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-bold tracking-[0.4em] text-white/20 mb-2 uppercase">{label}</p>
            <p className="text-xl font-display font-medium text-white/80">{value}</p>
        </div>
    </div>
)

const SocialLink = ({ icon, href }) => (
    <a
        href={href}
        className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-primary-gold hover:border-primary-gold transition-all"
    >
        {React.cloneElement(icon, { size: 24 })}
    </a>
)

const FormInput = ({ label, placeholder, type = "text" }) => (
    <div>
        <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 mb-4 block uppercase">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-primary-gold transition-colors text-white"
        />
    </div>
)

export default ContactPage
