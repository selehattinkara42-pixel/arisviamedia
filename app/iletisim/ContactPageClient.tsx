'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'
import { submitContactForm } from '@/app/actions/public'
import { PageContentData } from '@/app/actions/content'

type ContactContent = {
    title: PageContentData | null
    description: PageContentData | null
    emailTitle: PageContentData | null
    phoneTitle: PageContentData | null
    officeTitle: PageContentData | null
    formTitle: PageContentData | null
}

export default function ContactPageClient({ content }: { content: ContactContent }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate network delay for UX
        await new Promise(r => setTimeout(r, 1000))

        const res = await submitContactForm(formData)

        if (res.success) {
            setIsSuccess(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
        } else {
            alert('Bir hata oluştu. Lütfen tekrar deneyin.')
        }

        setIsSubmitting(false)
    }

    // Helper to get text size class
    const getSize = (size?: string, defaultSize = 'text-base') => {
        if (!size) return defaultSize
        return size.startsWith('text-') ? size : `text-${size}`
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-gold/5 to-transparent blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <header className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`hero-title mb-6 ${getSize(content.title?.fontSize, 'text-5xl md:text-7xl')}`}
                    >
                        {content.title?.content ? (
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">
                                <span dangerouslySetInnerHTML={{ __html: content.title.content.replace(/\n/g, '<br/>') }} />
                            </span>
                        ) : (
                            <>
                                LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">CONNECT</span>
                            </>
                        )}
                    </motion.h1>
                    <p className={`text-white/40 max-w-xl ${getSize(content.description?.fontSize, 'text-xl')}`}>
                        {content.description?.content || 'Yeni bir proje, iş birliği veya sadece bir merhaba. Dijital geleceğinizi birlikte tasarlayalım.'}
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div className="glass-panel p-8 flex items-start gap-6 group hover:border-primary-gold/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary-gold group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-1">{content.emailTitle?.content || 'Email'}</h3>
                                <p className="text-white/40 mb-2 text-sm">Genel İletişim & Projeler</p>
                                <a href="mailto:info@arisvia.com" className="text-xl text-white font-bold hover:text-primary-gold transition-colors">info@arisvia.com</a>
                            </div>
                        </div>

                        <div className="glass-panel p-8 flex items-start gap-6 group hover:border-primary-gold/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary-gold group-hover:scale-110 transition-transform">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-1">{content.phoneTitle?.content || 'Telefon'}</h3>
                                <p className="text-white/40 mb-2 text-sm">Hafta içi: 09:00 - 18:00</p>
                                <a href="tel:+905551234567" className="text-xl text-white font-bold hover:text-primary-gold transition-colors">+90 (555) 123 45 67</a>
                            </div>
                        </div>

                        <div className="glass-panel p-8 flex items-start gap-6 group hover:border-primary-gold/30 transition-colors">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary-gold group-hover:scale-110 transition-transform">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-white text-lg mb-1">{content.officeTitle?.content || 'Ofis'}</h3>
                                <p className="text-white/40 mb-2 text-sm">Merkez Ofis</p>
                                <p className="text-xl text-white font-bold">İstanbul, Türkiye</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-panel p-10 relative"
                    >
                        {isSuccess ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 bg-black/90 backdrop-blur z-20 rounded-2xl">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Mesajınız Alındı!</h3>
                                <p className="text-white/50 mb-8">En kısa sürede sizinle iletişime geçeceğiz.</p>
                                <button onClick={() => setIsSuccess(false)} className="btn-premium px-8 py-3 text-sm">Yeni Mesaj Gönder</button>
                            </div>
                        ) : null}

                        <h3 className="text-2xl font-display font-bold text-white mb-8">{content.formTitle?.content || 'Hemen İletişime Geçin'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-white/40">Ad Soyad</label>
                                    <input
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-white/40">E-Posta</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-white/40">Konu</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                                    placeholder="Proje hakkında..."
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-white/40">Mesajınız</label>
                                <textarea
                                    required
                                    className="w-full h-40 resize-none bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-gold/50 transition-colors"
                                    placeholder="Detaylardan bahsedin..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full btn-premium py-4 flex items-center justify-center gap-3 text-sm font-bold tracking-widest mt-4"
                            >
                                {isSubmitting ? 'GÖNDERİLİYOR...' : (
                                    <>GÖNDER <Send size={16} /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
