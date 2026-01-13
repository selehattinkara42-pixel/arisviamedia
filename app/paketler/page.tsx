import { getPublicPackages } from '@/app/actions/public'
import PackagesSection from '@/components/home/PackagesSection'

export default async function PackagesPage() {
    const items = await getPublicPackages()

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <div className="container mx-auto px-6 mb-20">
                <h1 className="hero-title text-5xl md:text-8xl mb-8">
                    HİZMET <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">PAKETLERİ</span>
                </h1>
                <p className="text-white/40 text-xl max-w-2xl">
                    Şeffaf fiyatlandırma, üstün hizmet kalitesi. İhtiyacınıza en uygun planı seçin.
                </p>
            </div>

            <PackagesSection items={items} />
        </div>
    )
}
