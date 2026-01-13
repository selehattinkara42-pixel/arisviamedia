import { getInboxMessages } from '@/app/actions/inbox'
import InboxManager from './InboxManager'

export default async function InboxPage() {
    const messages = await getInboxMessages()

    return (
        <div className="space-y-6 fade-in h-full">
            <header>
                <h2 className="text-3xl font-display font-bold text-white mb-2">Gelen Kutusu</h2>
                <p className="text-white/40">İletişim formundan gelen mesajlar.</p>
            </header>

            <InboxManager initialMessages={messages as any} />
        </div>
    )
}
