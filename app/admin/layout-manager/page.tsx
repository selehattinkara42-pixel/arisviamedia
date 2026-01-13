import { getSections } from '@/app/actions/sections'
import LayoutManager from './LayoutManager'

export default async function LayoutPage() {
    const sections = await getSections()

    return (
        <div className="space-y-6 fade-in h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Sayfa Düzeni</h2>
                <p className="text-white/40">Anasayfanızdaki bölümleri açıp kapatın.</p>
            </header>

            <LayoutManager initialSections={sections as any} />
        </div>
    )
}
