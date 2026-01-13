import SettingsForm from './SettingsForm'

export default function SettingsPage() {
    // No database call - settings will be loaded from localStorage on client
    return (
        <div className="p-8">
            <h2 className="text-3xl font-display font-bold text-white mb-8">Site Ayarları</h2>
            <SettingsForm />
        </div>
    )
}
