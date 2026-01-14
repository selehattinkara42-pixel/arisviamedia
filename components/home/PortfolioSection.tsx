
import PortfolioSectionClient from './PortfolioSectionClient'
import { getPageContent } from '@/app/actions/content'

type PortfolioItem = {
    id: number
    title: string
    description?: string
    category: string
    mediaUrl?: string | null
    coverUrl?: string | null
}

export default async function PortfolioSection({ items, showAll }: { items: PortfolioItem[], showAll?: boolean }) {
    const [titleSmall, titleLarge] = await Promise.all([
        getPageContent('home_portfolio_title_small'),
        getPageContent('home_portfolio_title_large')
    ])

    return (
        <PortfolioSectionClient
            items={items}
            showAll={showAll}
            content={{
                titleSmall,
                titleLarge
            }}
        />
    )
}
