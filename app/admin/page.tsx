'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Image, Package, Quote, Sparkles, Settings, Layers,
    MessageSquare, Type, HardDrive, BarChart, Users,
    TrendingUp, Inbox, Clock, ArrowRight, Loader2
} from 'lucide-react'
import { getDashboardStats, DashboardStats } from '@/app/actions/dashboard'

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getDashboardStats()
            setStats(data)
            setLoading(false)
        }
        fetchStats()
    }, [])

    const quickLinks = [
        { name: 'Sistem Durumu', desc: 'Depolama/DB', icon: HardDrive, link: '/admin/system', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
        { name: 'Medya Galeri', desc: 'Görsel Yönetimi', icon: Image, link: '/admin/media', color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { name: 'Site İçerikleri', desc: 'Yazılar/Fontlar', icon: Type, link: '/admin/content', color: 'text-pink-400', bg: 'bg-pink-500/10' },
        { name: 'Hero Kartları', desc: 'Kayan Kartlar', icon: Sparkles, link: '/admin/hero-cards', color: 'text-primary-gold', bg: 'bg-primary-gold/10' },
        { name: 'Portfolyo', desc: 'Projeler', icon: Image, link: '/admin/portfolio', color: 'text-accent-cyan', bg: 'bg-cyan-500/10' },
        { name: 'Paketler', desc: 'Fiyatlandırma', icon: Package, link: '/admin/packages', color: 'text-accent-purple', bg: 'bg-purple-500/10' },
        { name: 'Referanslar', desc: 'Müşteri Yorumları', icon: Quote, link: '/admin/testimonials', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { name: 'Gelen Kutusu', desc: 'Mesajlar', icon: MessageSquare, link: '/admin/inbox', color: 'text-orange-400', bg: 'bg-orange-500/10' },
        { name: 'Sayfa Düzeni', desc: 'Sıralama', icon: Layers, link: '/admin/layout-manager', color: 'text-rose-400', bg: 'bg-rose-500/10' },
        { name: 'Site Ayarları', desc: 'SEO/Favicon', icon: Settings, link: '/admin/settings', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    ]

    return (
        <div className="space-y-8">
            <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">Yönetim Paneli</h2>
                    <p className="text-white/40 font-body">Sitenizin anlık durumu ve yönetimi.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                    <Clock size={16} />
                    <span>Son Güncelleme: {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </header>

            {/* LIVE STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Okunmamış Mesaj"
                    value={loading ? '...' : stats?.counts.unreadMessages.toString() || '0'}
                    icon={Inbox}
                    color="text-orange-400"
                    bg="bg-orange-500/10"
                    trend={stats?.counts.unreadMessages ? "Yeni Mesajınız Var!" : "Tümü Okundu"}
                    trendColor={stats?.counts.unreadMessages ? "text-orange-400" : "text-green-400"}
                />
                <StatCard
                    title="Toplam Proje"
                    value={loading ? '...' : stats?.counts.projects.toString() || '0'}
                    icon={Image}
                    color="text-accent-cyan"
                    bg="bg-cyan-500/10"
                    trend="Aktif Portfolyo"
                    trendColor="text-white/40"
                />
                <StatCard
                    title="Toplam Mesaj"
                    value={loading ? '...' : stats?.counts.messages.toString() || '0'}
                    icon={MessageSquare}
                    color="text-indigo-400"
                    bg="bg-indigo-500/10"
                    trend="Alınan Talep"
                    trendColor="text-white/40"
                />
                <StatCard
                    title="Referanslar"
                    value={loading ? '...' : stats?.counts.testimonials.toString() || '0'}
                    icon={Users}
                    color="text-emerald-400"
                    bg="bg-emerald-500/10"
                    trend="Mutlu Müşteri"
                    trendColor="text-white/40"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* RECENT MESSAGES (2 cols) */}
                <div className="lg:col-span-2 glass-card p-6 border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-display font-bold text-lg text-white">Son Gelen Mesajlar</h3>
                        <Link href="/admin/inbox" className="text-xs text-primary-gold hover:underline flex items-center gap-1">
                            Tümünü Gör <ArrowRight size={12} />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {loading ? (
                            <div className="flex items-center justify-center h-40 text-white/20">
                                <Loader2 className="animate-spin mr-2" /> Yükleniyor...
                            </div>
                        ) : stats?.recentMessages.length === 0 ? (
                            <div className="text-center py-8 text-white/30 text-sm border-2 border-dashed border-white/5 rounded-xl">
                                Henüz mesaj yok.
                            </div>
                        ) : (
                            stats?.recentMessages.map((msg) => (
                                <Link key={msg.id} href={`/admin/inbox?id=${msg.id}`}>
                                    <div className={`p-4 rounded-xl border flex items-start gap-4 transition-colors hover:bg-white/5 cursor-pointer ${msg.status === 'UNREAD' ? 'bg-white/[0.03] border-primary-gold/30' : 'bg-transparent border-white/5'}`}>
                                        <div className={`w-2 h-2 rounded-full mt-2 ${msg.status === 'UNREAD' ? 'bg-primary-gold animate-pulse' : 'bg-white/10'}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className={`text-sm truncate ${msg.status === 'UNREAD' ? 'font-bold text-white' : 'font-medium text-white/70'}`}>{msg.name}</h4>
                                                <span className="text-[10px] text-white/30 whitespace-nowrap">{new Date(msg.createdAt).toLocaleDateString('tr-TR')}</span>
                                            </div>
                                            <p className="text-xs text-white/50 truncate">{msg.subject || '(Konu yok)'}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* QUICK ACCESS GRID (Compact) */}
                <div className="glass-card p-6 border-white/5">
                    <h3 className="font-display font-bold text-lg text-white mb-6">Hızlı Menü</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {quickLinks.map((item) => (
                            <Link key={item.name} href={item.link}>
                                <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer group flex flex-col items-center text-center h-full">
                                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                    </div>
                                    <span className="text-xs font-bold text-white/80 group-hover:text-white">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon: Icon, color, bg, trend, trendColor }: any) {
    return (
        <div className="glass-card p-5 border-white/5 flex items-start justify-between relative overflow-hidden group">
            {/* Glow Effect */}
            <div className={`absolute top-0 right-0 w-20 h-20 ${bg.replace('/10', '/5')} rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:scale-150`} />

            <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-3xl font-display font-bold text-white mb-2">{value}</h3>
                <p className={`text-xs flex items-center gap-1 ${trendColor}`}>
                    <TrendingUp size={12} /> {trend}
                </p>
            </div>

            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={color} size={20} />
            </div>
        </div>
    )
}
