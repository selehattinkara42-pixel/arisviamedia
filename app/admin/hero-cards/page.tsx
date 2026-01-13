import { defaults } from '@/lib/localData'
import HeroCardManager from './HeroCardManager'

export default function HeroCardsPage() {
    // Pass default cards - the client component will load from localStorage
    return (
        <div className="p-8">
            <HeroCardManager initialCards={defaults.heroCards as any} />
        </div>
    )
}
