import React from 'react'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

const PortfolioPage = () => {
    const projects = [
        { title: "Luxe Estate", category: "Full Branding", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800", color: "from-primary-gold" },
        { title: "Quantum Tech", category: "Interface Design", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", color: "from-accent-cyan" },
        { title: "Velvet Fashion", category: "Video Production", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800", color: "from-accent-purple" },
        { title: "Aero Drone", category: "Cinematography", img: "https://images.unsplash.com/photo-1473968512447-ac175bb42935?auto=format&fit=crop&q=80&w=800", color: "from-primary-gold" },
        { title: "Nova App", category: "App Development", img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800", color: "from-accent-cyan" },
        { title: "Zenith Identity", category: "Corporate ID", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", color: "from-accent-purple" },
    ]

    return (
        <PageTransition>
            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <header className="mb-32">
                    <h1 className="hero-title mb-8 italic tracking-tighter">PORTFOLYO</h1>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <p className="text-white/40 max-w-xl text-lg leading-relaxed">
                            Her biri bir sanat eseri titizliğiyle işlenmiş, markalarımızın dijital dönüşüm yolculukları.
                            Sıradanlığın ötesine geçen işlerimizi inceleyin.
                        </p>
                        <div className="flex gap-4">
                            {['Hepsi', 'Video', 'Tasarım', 'Strateji'].map(cat => (
                                <button key={cat} className="px-6 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-primary-gold hover:text-black transition-all text-xs font-bold uppercase tracking-widest">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-12 mb-40">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-700 z-10" />
                            <img
                                src={project.img}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt={project.title}
                            />

                            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
                                <motion.span
                                    className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${project.color} to-transparent text-[10px] font-bold uppercase tracking-widest mb-4 opacity-0 group-hover:opacity-100 transition-opacity`}
                                >
                                    {project.category}
                                </motion.span>
                                <div className="flex items-center justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-4xl md:text-5xl font-display font-extrabold">{project.title}</h3>
                                    <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center group-hover:bg-white transition-colors">
                                        <ArrowUpRight className="text-white group-hover:text-black transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <section className="text-center">
                    <h2 className="text-3xl font-display font-bold mb-8">DAHA FAZLASINI MI İSTİYORSUNUZ?</h2>
                    <button className="btn-premium px-12 py-5 text-lg">PROJENİZİ ANLATIN</button>
                </section>
            </div>
        </PageTransition>
    )
}

export default PortfolioPage
