import React from 'react'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const ReferencesPage = () => {
    const testimonials = [
        {
            name: "Selahattin Kara",
            role: "CEO, Arsa Adam",
            text: "Aris Via Media ile çalışmak markamızın dijital algısını tamamen değiştirdi. Kusursuz bir vizyon ve uygulama gücü.",
            company: "Arsa Adam"
        },
        {
            name: "Derin Yılmaz",
            role: "Pazarlama Direktörü",
            text: "Beklentilerimizin çok ötesinde bir profesyonellik. Video prodüksiyon kaliteleri gerçekten dünya standartlarında.",
            company: "Global Tech"
        },
        {
            name: "Mert Demir",
            role: "Kreatif Direktör",
            text: "Tasarım dilleri ve estetik anlayışları büyüleyici. Markamızın asaletini dijitalde en doğru şekilde yansıttılar.",
            company: "Luxe Fashion"
        }
    ]

    return (
        <PageTransition>
            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <header className="mb-32 text-center">
                    <h1 className="hero-title mb-8 italic tracking-tighter">REFERANSLARIMIZ</h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
                        Birlikte başardığımız, sınırları aştığımız ve dijital dünyada fark yarattığımız iş ortaklarımız.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-8 mb-40">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -15 }}
                            className="glass-panel p-12 relative overflow-hidden flex flex-col h-full"
                        >
                            <Quote className="text-primary-gold/20 absolute -top-4 -right-4 w-32 h-32" />
                            <div className="flex-grow">
                                <p className="text-xl text-white/80 leading-relaxed italic mb-12">
                                    "{t.text}"
                                </p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold font-display">{t.name}</h4>
                                <p className="text-primary-gold text-xs uppercase tracking-[0.2em] font-bold mt-2">{t.role}</p>
                                <div className="mt-8 pt-8 border-t border-white/5">
                                    <p className="text-white/20 font-display font-bold text-sm tracking-tighter uppercase italic">{t.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Logo Grid (Placeholder) */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center opacity-30 brightness-0 invert grayscale">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                        <div key={i} className="h-12 w-full glass-panel border-none flex items-center justify-center p-4">
                            <span className="font-display font-bold text-xs">PARTNER #{i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    )
}

export default ReferencesPage
