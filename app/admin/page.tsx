
import Link from 'next/link'
import { Image, Package, Quote, Sparkles, Settings, Layers, MessageSquare, MousePointer2, Type } from 'lucide-react'

export default function AdminDashboard() {
    const quickLinks = [
        { name: 'Site İçerikleri', desc: 'Sitedeki metinleri ve fontları yönetin', icon: Type, link: '/admin/content', color: 'text-pink-400' },
        { name: 'Hero Kartları', desc: 'Ana sayfadaki yüzen kartları yönetin', icon: Sparkles, link: '/admin/hero-cards', color: 'text-primary-gold' },
        { name: 'Portfolyo', desc: 'Proje ve video içeriklerinizi yönetin', icon: Image, link: '/admin/portfolio', color: 'text-accent-cyan' },
        { name: 'Paketler', desc: 'Fiyatlandırma paketlerini düzenleyin', icon: Package, link: '/admin/packages', color: 'text-accent-purple' },
        { name: 'Referanslar', desc: 'Müşteri yorumlarını yönetin', icon: Quote, link: '/admin/testimonials', color: 'text-emerald-400' },
        { name: 'Gelen Kutusu', desc: 'İletişim formlarını görüntüleyin', icon: MessageSquare, link: '/admin/inbox', color: 'text-orange-400' },
        { name: 'Sayfa Düzeni', desc: 'Bölüm sıralamasını ayarlayın', icon: Layers, link: '/admin/layout-manager', color: 'text-rose-400' },
        { name: 'Site Ayarları', desc: 'SEO ve genel ayarları düzenleyin', icon: Settings, link: '/admin/settings', color: 'text-amber-400' },
    ]

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">Yönetim Paneli</h2>
                <p className="text-white/40 font-body">Hoş geldiniz! Sitenizi buradan yönetebilirsiniz.</p>
            </header>

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

            {/* Status Summary (Optional Future Feature) */}
            <div className="glass-card p-6 border-white/5">
                <h3 className="text-lg font-display font-bold text-white mb-4">Sistem Durumu</h3>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-white/60 text-sm">Tüm sistemler çalışıyor. Veritabanı bağlantısı aktif.</span>
                </div>
            </div>
        </div>
    )
}
