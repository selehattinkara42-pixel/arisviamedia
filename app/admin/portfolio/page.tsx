import { getPortfolioItems } from '@/app/actions/portfolio'
import PortfolioManager from './PortfolioManager'

export default async function AdminPortfolioPage() {
    const items = await getPortfolioItems()

    return (
        <div className="space-y-6 h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Portfolyo Yönetimi</h2>
                <p className="text-white/40">Dijital sanat galerinizi buradan yönetin.</p>
            </header>

            <PortfolioManager initialItems={items as any} />
        </div>
    )
}
