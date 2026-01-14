import { getReferences } from '@/app/actions/references'
import ReferenceManager from './ReferenceManager'

export default async function ReferencesPage() {
    const references = await getReferences()

    return (
        <div className="space-y-6 h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Referanslar</h2>
                <p className="text-white/40">Çalıştığınız marka ve kurumları yönetin. Logolarını yükleyin ve anasayfada sergileyin.</p>
            </header>

            <ReferenceManager initialItems={references as any} />
        </div>
    )
}
