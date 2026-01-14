
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, HardDrive, FileImage, Layers, Type, AlertCircle, RefreshCw } from 'lucide-react'
import { getSystemUsage, SystemUsage } from '@/app/actions/usage'

export default function SystemStatusPage() {
    const [stats, setStats] = useState<SystemUsage | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchStats = async () => {
        setLoading(true)
        const data = await getSystemUsage()
        setStats(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-gold"></div>
            </div>
        )
    }

    if (!stats) return null

    // Vercel Postgres Free Tier Limits (Approx)
    // Rows: 10,000 limit for free tier usually, but lets calculate % based on a safe soft limit like 5000
    // Vercel Blob Free Tier: 250MB
    const BLOB_LIMIT_MB = 250
    const ROW_LIMIT_SOFT = 3000

    const storageUsedPercent = Math.min((parseFloat(stats.storage.totalSizeMB) / BLOB_LIMIT_MB) * 100, 100)
    const dbUsedPercent = Math.min((stats.database.totalRows / ROW_LIMIT_SOFT) * 100, 100)

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Sistem Durumu</h1>
                    <p className="text-white/40">Veritabanı ve dosya depolama alanı kullanım detayları.</p>
                </div>
                <button
                    onClick={fetchStats}
                    className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    Verileri Yenile
                </button>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* DATABASE CARD */}
                <div className="glass-card p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/20" />

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                            <Database size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Veritabanı</h2>
                            <p className="text-white/40 text-sm">Postgres Kayıtları</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white/60">Toplam Kayıt Kapasitesi (Tahmini)</span>
                                <span className="text-blue-400 font-bold">{stats.database.totalRows} / {ROW_LIMIT_SOFT}</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${dbUsedPercent}%` }}
                                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                                />
                            </div>
                            <p className="text-xs text-white/30 mt-2">
                                *Bu limit Vercel Hobby planı için yaklaşık bir sınırdır. Pro planlarda çok daha yüksektir.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <StatBox icon={Layers} label="Portfolyo" value={stats.database.projects} color="text-pink-400" bg="bg-pink-500/10" />
                            <StatBox icon={FileImage} label="Referanslar" value={stats.database.references} color="text-green-400" bg="bg-green-500/10" />
                            <StatBox icon={Type} label="İçerik Alanları" value={stats.database.contentItems} color="text-yellow-400" bg="bg-yellow-500/10" />
                            <StatBox icon={Database} label="Toplam Satır" value={stats.database.totalRows} color="text-white" bg="bg-white/10" />
                        </div>
                    </div>
                </div>

                {/* STORAGE CARD */}
                <div className="glass-card p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-orange-500/20" />

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
                            <HardDrive size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Dosya Depolama</h2>
                            <p className="text-white/40 text-sm">Vercel Blob Storage</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white/60">Kullanılan Alan</span>
                                <span className="text-orange-400 font-bold">{stats.storage.totalSizeMB} MB / {BLOB_LIMIT_MB} MB</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${storageUsedPercent}%` }}
                                    className={`h-full rounded-full ${storageUsedPercent > 90 ? 'bg-red-500' : 'bg-gradient-to-r from-orange-600 to-yellow-400'}`}
                                />
                            </div>
                            {storageUsedPercent > 80 && (
                                <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
                                    <AlertCircle size={12} />
                                    <span>Depolama alanı dolmak üzere! Eski dosyaları silerek yer açabilirsiniz.</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    <FileImage size={18} className="text-white/60" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold">Toplam Dosya</p>
                                    <p className="text-xs text-white/40">Görsel ve diğer medya</p>
                                </div>
                            </div>
                            <span className="text-2xl font-display font-bold text-white">{stats.storage.totalFiles}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-primary-gold/5 border border-primary-gold/20">
                            <p className="text-xs text-primary-gold/80 leading-relaxed">
                                <strong>İpucu:</strong> Favicon gibi küçük dosyalar artık Base64 olarak veritabanında saklanıyor. Sadece büyük proje görselleri ve referans logoları buradaki kotayı etkiler.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatBox({ icon: Icon, label, value, color, bg }: any) {
    return (
        <div className={`p-4 rounded-xl ${bg} flex flex-col items-center justify-center text-center gap-2 group hover:scale-105 transition-transform`}>
            <Icon size={20} className={color} />
            <span className={`text-2xl font-bold font-display ${color}`}>{value}</span>
            <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
        </div>
    )
}
