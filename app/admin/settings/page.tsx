import { getSiteSettings } from '@/app/actions/settings'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
    const settings = await getSiteSettings()

    return (
        <div className="p-8">
            <h2 className="text-3xl font-display font-bold text-white mb-8">Site Ayarları</h2>
            <SettingsForm initialSettings={settings as any} />
        </div>
    )
}
