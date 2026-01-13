import LogoEditor from './LogoEditor'

const defaultConfig = {
    width: 150,
    height: 50,
    x: 20,
    y: 20,
    visibility: ['desktop', 'tablet', 'mobile']
}

export default function LogoSettingsPage() {
    return (
        <div className="space-y-6 h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Logo Konfigürasyonu</h2>
                <p className="text-white/40">Logonuzun tüm cihazlardaki boyutunu ve konumunu piksel hassasiyetiyle ayarlayın.</p>
            </header>

            <LogoEditor initialConfig={defaultConfig} />
        </div>
    )
}
