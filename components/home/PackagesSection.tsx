
import PackagesSectionClient from './PackagesSectionClient'
import { getPageContent } from '@/app/actions/content'

export default async function PackagesSection({ items }: { items: any[] }) {
    const title = await getPageContent('packages_section_title')
    const subtitle = await getPageContent('packages_section_subtitle')

    return (
        <PackagesSectionClient
            items={items}
            content={{ title, subtitle }}
        />
    )
}
