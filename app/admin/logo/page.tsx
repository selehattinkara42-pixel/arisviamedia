import { getLogoConfig } from '@/app/actions/logo'
import LogoEditor from './LogoEditor'

export default async function LogoSettingsPage() {
    const config = await getLogoConfig()

    return (
        <div className="space-y-6 h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Logo Konfigürasyonu</h2>
                <p className="text-white/40">Logonuzun tüm cihazlardaki boyutunu ve konumunu piksel hassasiyetiyle ayarlayın.</p>
            </header>

            <LogoEditor initialConfig={config} />
        </div>
    )
}
