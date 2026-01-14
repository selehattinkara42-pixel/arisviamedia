
import HeroSectionClient from './HeroSectionClient'
import { getPageContent, getContentByPage } from '@/app/actions/content'

// This Server Component fetches content and passes it to the Client Component
export default async function HeroSection() {

    // Fetch all content for home page in one batch (cached) to avoid waterfalls
    // But since getPageContent is cached individually, we can also call them.
    // Let's use individual calls for clarity, relying on React cache / unstable_cache

    const [titleSmall, titleLarge, description, buttonText] = await Promise.all([
        getPageContent('home_hero_title_small'),
        getPageContent('home_hero_title_large'),
        getPageContent('home_hero_description'),
        getPageContent('home_hero_button')
    ])

    return (
        <HeroSectionClient
            content={{
                titleSmall,
                titleLarge,
                description,
                buttonText
            }}
        />
    )
}
