
import ServicesSectionClient from './ServicesSectionClient'
import { getPageContent } from '@/app/actions/content'

export default async function ServicesSection() {
    const [titleSmall, titleLarge] = await Promise.all([
        getPageContent('home_services_title_small'),
        getPageContent('home_services_title_large')
    ])

    return (
        <ServicesSectionClient
            content={{
                titleSmall,
                titleLarge
            }}
        />
    )
}
