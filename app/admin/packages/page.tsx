import { getPackages } from '@/app/actions/packages'
import PackageManager from './PackageManager'

export default async function AdminPackagesPage() {
    const packages = await getPackages()

    return (
        <div className="space-y-6 h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Paket Planları</h2>
                <p className="text-white/40">Müşterilerinize sunduğunuz hizmet paketlerini ve fiyatlandırmayı yönetin.</p>
            </header>

            <PackageManager initialPackages={packages} />
        </div>
    )
}
