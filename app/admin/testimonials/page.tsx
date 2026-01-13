import { defaults } from '@/lib/localData'
import TestimonialManager from './TestimonialManager'

export default function TestimonialsPage() {
    return (
        <div className="space-y-6 h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Müşteri Yorumları</h2>
                <p className="text-white/40">Güven inşa eden referansları buradan yönetin.</p>
            </header>

            <TestimonialManager initialItems={defaults.testimonials as any} />
        </div>
    )
}
