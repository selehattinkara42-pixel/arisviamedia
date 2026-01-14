
import HeroCardManager from './HeroCardManager'
import { getAllHeroCards } from '@/app/actions/hero'

export default async function HeroCardsPage() {
    // Fetch all cards from DB (including hidden ones)
    const cards = await getAllHeroCards()

    return (
        <div className="p-8">
            <HeroCardManager initialCards={cards} />
        </div>
    )
}
