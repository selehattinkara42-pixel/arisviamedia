
import HeroSectionClient from './HeroSectionClient'
import { getPageContent } from '@/app/actions/content'
import { getHeroCards, seedHeroCards } from '@/app/actions/hero'

// This Server Component fetches content and passes it to the Client Component
export default async function HeroSection() {

    // Fetch text content
    const [titleSmall, titleLarge, description, buttonText] = await Promise.all([
        getPageContent('home_hero_title_small'),
        getPageContent('home_hero_title_large'),
        getPageContent('home_hero_description'),
        getPageContent('home_hero_button')
    ])

    // Fetch hero cards from DB
    let cards = await getHeroCards()

    // Auto-seed if empty (first run fallback)
    if (cards.length === 0) {
        await seedHeroCards()
        cards = await getHeroCards()
    }

    return (
        <HeroSectionClient
            content={{
                titleSmall,
                titleLarge,
                description,
                buttonText
            }}
            initialCards={cards}
        />
    )
}
