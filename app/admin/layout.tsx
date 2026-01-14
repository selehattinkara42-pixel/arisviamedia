export const metadata = {
    title: 'ARIS VIA | Yönetim Paneli',
    description: 'Ultimate Control Center',
}

import Link from 'next/link'
import { LayoutDashboard, Image, Package, Settings, MousePointer2, MessageSquare, Quote, Layers, Sparkles, Building2, LogOut, LayoutTemplate } from 'lucide-react'
import { logout } from '@/app/actions/auth'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const menuItems = [
        { name: 'Genel Bakış', path: '/admin', icon: <LayoutDashboard size={18} /> },
        { name: 'Hero Kartları', path: '/admin/hero-cards', icon: <Sparkles size={18} /> },
        { name: 'Portfolyo', path: '/admin/portfolio', icon: <Image size={18} /> },
        { name: 'Paketler', path: '/admin/packages', icon: <Package size={18} /> },
        { name: 'Referanslar', path: '/admin/references', icon: <Building2 size={18} /> },
        { name: 'Müşteri Yorumları', path: '/admin/testimonials', icon: <Quote size={18} /> },
        { name: 'Gelen Kutusu', path: '/admin/inbox', icon: <MessageSquare size={18} /> },
        { name: 'Sayfa Düzeni', path: '/admin/layout-manager', icon: <Layers size={18} /> },
        { name: 'Site İçerikleri', path: '/admin/content', icon: <LayoutTemplate size={18} /> },
        { name: 'Logo Ayarları', path: '/admin/logo', icon: <MousePointer2 size={18} /> },
        { name: 'Site Ayarları', path: '/admin/settings', icon: <Settings size={18} /> },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Glass Sidebar */}
            <aside className="w-64 fixed h-full glass-panel m-4 rounded-3xl z-50 border-r border-white/10 hidden md:flex flex-col p-6">
                <div className="mb-10 pl-2">
                    <h1 className="font-display font-bold text-xl tracking-widest text-primary-gold">ARIS VIA</h1>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Command Center</p>
                </div>

                <nav className="space-y-2 flex-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link key={item.path} href={item.path}>
                            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-primary-gold transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-3 group">
                                <span className="group-hover:text-primary-gold transition-colors">{item.icon}</span>
                                {item.name}
                            </button>
                        </Link>
                    ))}
                </nav>

                <div className="pt-6 border-t border-white/5 space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-gold to-primary-bronze"></div>
                        <div>
                            <p className="text-xs font-bold text-white">Selahattin Kara</p>
                            <p className="text-[10px] text-white/40">Owner</p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <form action={logout}>
                        <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-red-500/10 text-red-400/60 hover:text-red-400 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                            <LogOut size={16} />
                            Çıkış Yap
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-72 p-8 overflow-y-auto min-h-screen">
                {children}
            </main>
        </div>
    )
}
