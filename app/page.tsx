import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import PackagesSection from '@/components/home/PackagesSection'
import ReferencesSection from '@/components/home/ReferencesSection'
import { getPortfolioItems } from '@/app/actions/portfolio'
import { getPackages } from '@/app/actions/packages'
import { getTestimonials } from '@/app/actions/testimonials'
import { getPublicReferences } from '@/app/actions/references'

export default async function Home() {
  // Fetch data from database
  const [portfolioItems, packages, testimonials, references] = await Promise.all([
    getPortfolioItems(),
    getPackages(),
    getTestimonials(),
    getPublicReferences()
  ])

  return (
    <main className="relative z-10 min-h-screen">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection items={portfolioItems} />
      <ReferencesSection items={references} />
      <TestimonialsSection items={testimonials} />
      <PackagesSection items={packages} />

      {/* Contact CTA */}
      <section className="py-32 relative bg-gradient-to-t from-primary-gold/10 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">PROJENİZİ BAŞLATIN</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
            Vizyonunuzu gerçeğe dönüştürmek için hazırsanız, biz de hazırız. Bir kahve eşliğinde fikirlerinizi konuşalım.
          </p>
          <Link href="/iletisim">
            <button className="btn-premium px-12 py-5 text-lg">BİZE ULAŞIN</button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4 tracking-widest">ARIS <span className="text-primary-gold">VIA</span></h2>
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-8">Media & Technology 2026</p>
          <div className="flex justify-center gap-8 text-white/40 text-sm">
            <Link href="/hizmetler" className="hover:text-white transition-colors">Hizmetler</Link>
            <Link href="/portfolyo" className="hover:text-white transition-colors">Portfolyo</Link>
            <Link href="/referanslar" className="hover:text-white transition-colors">Referanslar</Link>
            <Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Yönetim</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
