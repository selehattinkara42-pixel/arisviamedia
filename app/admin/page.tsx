import Link from 'next/link'
import { Image, Package, Quote, Sparkles, Settings, Layers, MessageSquare, MousePointer2 } from 'lucide-react'

export default function AdminDashboard() {
    const quickLinks = [
        { name: 'Hero Kartları', desc: 'Ana sayfadaki yüzen kartları yönetin', icon: Sparkles, link: '/admin/hero-cards', color: 'text-primary-gold' },
        { name: 'Portfolyo', desc: 'Proje ve video içeriklerinizi yönetin', icon: Image, link: '/admin/portfolio', color: 'text-accent-cyan' },
        { name: 'Paketler', desc: 'Fiyatlandırma paketlerini düzenleyin', icon: Package, link: '/admin/packages', color: 'text-accent-purple' },
        { name: 'Referanslar', desc: 'Müşteri yorumlarını yönetin', icon: Quote, link: '/admin/testimonials', color: 'text-emerald-400' },
        { name: 'Gelen Kutusu', desc: 'İletişim formlarını görüntüleyin', icon: MessageSquare, link: '/admin/inbox', color: 'text-orange-400' },
        { name: 'Sayfa Düzeni', desc: 'Bölüm sıralamasını ayarlayın', icon: Layers, link: '/admin/layout-manager', color: 'text-rose-400' },
        { name: 'Logo Ayarları', desc: 'Logo görünümünü özelleştirin', icon: MousePointer2, link: '/admin/logo', color: 'text-sky-400' },
        { name: 'Site Ayarları', desc: 'SEO ve genel ayarları düzenleyin', icon: Settings, link: '/admin/settings', color: 'text-amber-400' },
    ]

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">Yönetim Paneli</h2>
                <p className="text-white/40 font-body">Hoş geldiniz! Sitenizi buradan yönetebilirsiniz.</p>
            </header>

            {/* Info Banner */}
            <div className="glass-card p-6 border-primary-gold/30 bg-primary-gold/5">
                <h3 className="font-bold text-primary-gold mb-2">💡 Yerel Mod Aktif</h3>
                <p className="text-white/60 text-sm">
                    Veriler tarayıcınızda saklanıyor. Değişiklikler anlık olarak kaydedilir ve sayfa yenilense bile korunur.
                </p>
            </div>

            {/* Quick Access Grid */}
            <div>
                <h3 className="text-lg font-display font-bold text-white mb-4">Hızlı Erişim</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickLinks.map((item) => (
                        <Link key={item.name} href={item.link}>
                            <div className="glass-card p-6 hover:border-white/20 transition-all cursor-pointer group h-full">
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-5 h-5 ${item.color}`} />
                                </div>
                                <h4 className="font-bold text-white mb-1 group-hover:text-primary-gold transition-colors">{item.name}</h4>
                                <p className="text-white/40 text-sm">{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-display font-bold text-white mb-4">Nasıl Çalışır?</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="space-y-2">
                        <div className="w-8 h-8 rounded-full bg-primary-gold/20 flex items-center justify-center text-primary-gold font-bold">1</div>
                        <h4 className="font-bold text-white">Düzenleyin</h4>
                        <p className="text-white/50">Kartları, portfolyoyu, paketleri ve referansları istediğiniz gibi düzenleyin.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan font-bold">2</div>
                        <h4 className="font-bold text-white">Kaydedin</h4>
                        <p className="text-white/50">Değişiklikler otomatik olarak tarayıcınızda kaydedilir.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple font-bold">3</div>
                        <h4 className="font-bold text-white">Görüntüleyin</h4>
                        <p className="text-white/50">Ana sayfaya gidip değişikliklerinizi anında görün.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
