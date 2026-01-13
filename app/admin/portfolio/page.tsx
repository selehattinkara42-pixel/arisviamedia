import { defaults } from '@/lib/localData'
import PortfolioManager from './PortfolioManager'

export default function AdminPortfolioPage() {
    return (
        <div className="space-y-6 h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Portfolyo Yönetimi</h2>
                <p className="text-white/40">Dijital sanat galerinizi buradan yönetin.</p>
            </header>

            <PortfolioManager initialItems={defaults.portfolio as any} />
        </div>
    )
}
