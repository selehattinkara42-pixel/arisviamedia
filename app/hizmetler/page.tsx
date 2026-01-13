import ServicesSection from '@/components/home/ServicesSection'

export default function ServicesPage() {
    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <div className="container mx-auto px-6 mb-20">
                <h1 className="hero-title text-5xl md:text-8xl mb-8">
                    360° <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">ÇÖZÜMLER</span>
                </h1>
                <p className="text-white/40 text-xl max-w-2xl">
                    Dijital dünyada var olmanın ötesine geçin. Liderlik edin.
                </p>
            </div>

            <ServicesSection />
        </div>
    )
}
