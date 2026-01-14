
import ReferencesSectionClient from './ReferencesSectionClient'
import { getPageContent } from '@/app/actions/content'

type ReferenceItem = {
    id: number
    name: string
    logoUrl?: string | null
    category: string
}

export default async function ReferencesSection({ items }: { items: ReferenceItem[] }) {
    const title = await getPageContent('home_references_title')

    return (
        <ReferencesSectionClient
            items={items}
            content={{ title }}
        />
    )
}
