import { getPublicPortfolio } from '@/app/actions/public'
import PortfolioSection from '@/components/home/PortfolioSection'

export default async function PortfolioPage() {
    const items = await getPublicPortfolio()

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <div className="container mx-auto px-6 mb-20">
                <h1 className="hero-title text-5xl md:text-8xl mb-8">
                    SEÇKİN <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">İŞLERİMİZ</span>
                </h1>
                <p className="text-white/40 text-xl max-w-2xl">
                    Sanat ve teknolojinin kesişim noktasında ürettiğimiz projeler, markaları dönüştürüyor.
                </p>
            </div>

            {/* Reuse the Portfolio Section component but maybe passing all items or a paginated list later */}
            <PortfolioSection items={items} />
        </div>
    )
}
