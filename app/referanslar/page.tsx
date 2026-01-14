import { getPublicReferences } from '@/app/actions/references'
import ReferencesPageClient from './ReferencesPageClient'

export const metadata = {
    title: 'Referanslar | ARİS VİA MEDIA',
    description: 'Çalıştığımız markalar ve iş ortaklarımız.'
}

export default async function ReferencesPage() {
    const items = await getPublicReferences()

    return <ReferencesPageClient items={items} />
}
