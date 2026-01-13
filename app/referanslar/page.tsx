import { getPublicTestimonials } from '@/app/actions/public'
import TestimonialsSection from '@/components/home/TestimonialsSection'

export default async function ReferencesPage() {
    const items = await getPublicTestimonials()

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <div className="container mx-auto px-6 mb-20">
                <h1 className="hero-title text-5xl md:text-8xl mb-8">
                    MUTLU <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">MARKALAR</span>
                </h1>
                <p className="text-white/40 text-xl max-w-2xl">
                    Bizimle çalışan markaların başarı hikayelerine göz atın.
                </p>
            </div>

            <TestimonialsSection items={items} />
        </div>
    )
}
