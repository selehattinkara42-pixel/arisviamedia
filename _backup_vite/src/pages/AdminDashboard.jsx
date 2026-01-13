import React from 'react'
import { motion } from 'framer-motion'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import {
    Activity, Users, CreditCard, Box, TrendingUp, AlertCircle,
    ChevronRight, MoreVertical, Search, Bell, Shield, Database
} from 'lucide-react'

const data = [
    { name: 'Pzt', value: 400 },
    { name: 'Sal', value: 300 },
    { name: 'Çar', value: 600 },
    { name: 'Per', value: 800 },
    { name: 'Cum', value: 500 },
    { name: 'Cmt', value: 900 },
    { name: 'Paz', value: 700 },
]

const AdminDashboard = () => {
    return (
        <div className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Üst Başlık Bölümü */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-primary-gold mb-2">
                        <Shield size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Güvenli Yönetim Paneli</span>
                    </div>
                    <h1 className="text-4xl font-display font-extrabold mb-2 tracking-tight">KONTROL MERKEZİ</h1>
                    <p className="text-white/40 flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Sistem aktif. Marka verileri analiz ediliyor...
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="glass-panel px-4 py-2 flex items-center gap-3 border-white/5">
                        <Search className="text-white/30" size={18} />
                        <input
                            type="text"
                            placeholder="Sistemde ara..."
                            className="bg-transparent border-none outline-none text-sm w-40 focus:w-64 transition-all"
                        />
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} className="glass-panel p-2 cursor-pointer relative border-white/5">
                        <Bell size={20} className="text-white/60" />
                        <div className="absolute top-2 right-2 w-2 h-2 bg-primary-gold rounded-full border border-black" />
                    </motion.div>
                </div>
            </div>

            {/* Ana Izgara */}
            <div className="grid grid-cols-12 gap-8">

                {/* Sol Taraf: İstatistikler ve Grafikler */}
                <div className="col-span-12 lg:col-span-9 space-y-8">

                    {/* İstatistik Çubuğu */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard icon={<Users />} label="Toplam Erişim" value="14.292" trend="+12%" />
                        <StatCard icon={<TrendingUp />} label="Etkileşim Oranı" value="78.4%" trend="+2%" />
                        <StatCard icon={<CreditCard />} label="Aylık Ciro" value="₺4.8M" trend="+24%" />
                        <StatCard icon={<Activity />} label="Sunucu Durumu" value="99.9%" trend="Stabil" />
                    </div>

                    {/* Büyük Görselleştirme Bölümü */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="glass-panel p-8 min-h-[450px] relative overflow-hidden group border-white/5"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold flex items-center gap-2 font-display">
                                <Box className="text-primary-gold" size={20} />
                                Etkileşim Akışı Zamansal Analiz
                            </h3>
                            <div className="flex gap-2">
                                {['1S', '12S', '24S', '7G'].map((t) => (
                                    <button key={t} className="text-[10px] font-bold px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/5 hover:border-primary-gold/30 transition-all">
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-[300px] w-full mt-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#ffffff20"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#ffffff40' }}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '16px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#D4AF37"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Arka plan dekoratif öğeler */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-gold/5 blur-[100px] rounded-full pointer-events-none" />
                    </motion.div>

                    {/* Modüler Askıda Paneller Satırı */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <ModularPanel title="Müşteri Akışı" status="Senkronize Edildi">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white/10 to-transparent flex items-center justify-center">
                                            <Users size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Düğüm #012{i}</p>
                                            <p className="text-[10px] uppercase text-white/30 tracking-widest italic">Aktif Bağlantı</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-white/20 group-hover:text-primary-gold" />
                                </div>
                            ))}
                        </ModularPanel>

                        <ModularPanel title="Sistem Uyarıları" status="3 Uyarı">
                            <div className="space-y-4">
                                <div className="p-4 border-l-2 border-primary-gold bg-primary-gold/5 rounded-r-xl">
                                    <p className="text-sm font-bold flex items-center gap-2">
                                        <AlertCircle size={14} className="text-primary-gold" />
                                        Yüksek Bellek Kullanımı
                                    </p>
                                    <p className="text-xs text-white/40 mt-1">Görsel işleme kapasitesi %85 sınırına yaklaştı.</p>
                                </div>
                                <div className="p-4 border-l-2 border-white/10 bg-white/2 rounded-r-xl">
                                    <p className="text-sm font-bold">Bakım Tamamlandı</p>
                                    <p className="text-xs text-white/40 mt-1">Alt sistem #74 başarıyla geri yüklendi.</p>
                                </div>
                            </div>
                        </ModularPanel>
                    </div>
                </div>

                {/* Sağ Taraf: Hızlı İşlemler ve Yan Bar */}
                <div className="col-span-12 lg:col-span-3 space-y-8">
                    <div className="glass-panel p-6 border-white/5">
                        <h3 className="text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-6 text-white/30">Durum Özeti</h3>
                        <div className="space-y-6">
                            <StatusItem label="Yapay Zeka" progress={92} />
                            <StatusItem label="Veri Güvenliği" progress={64} />
                            <StatusItem label="Verimlilik Oranı" progress={88} />
                            <StatusItem label="Donanım Bağı" progress={30} />
                        </div>
                    </div>

                    <div className="glass-panel p-6 relative overflow-hidden group border-white/5">
                        <div className="relative z-10">
                            <Database className="text-primary-gold mb-4" size={24} />
                            <h3 className="text-lg font-bold mb-4 italic font-display">BULUTU YÜKSELT</h3>
                            <p className="text-xs text-white/50 mb-6 leading-relaxed">Kuantum veri analitiği ve sınırsız depolama alanına geçiş yapın.</p>
                            <button className="w-full btn-premium py-3 text-[10px] tracking-[0.2em] uppercase">Premium Geçiş - ₺149/ay</button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <button className="glass-panel p-4 flex items-center justify-between hover:bg-white/5 transition-all group border-white/5">
                            <span className="text-sm font-bold">Sistem Ayarları</span>
                            <MoreVertical size={16} className="text-white/20" />
                        </button>
                        <button className="glass-panel p-4 flex items-center justify-between hover:bg-white/5 transition-all group text-red-400 border-red-400/10">
                            <span className="text-sm font-bold">Acil Kapatma</span>
                            <Activity size={16} className="opacity-40" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

const StatCard = ({ icon, label, value, trend }) => (
    <motion.div
        whileHover={{ y: -5, shadow: "0 10px 30px rgba(0,0,0,0.5)" }}
        className="glass-panel p-6 flex flex-col gap-4 border-white/5"
    >
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary-gold border border-white/10 shadow-inner">
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">{label}</p>
            <div className="flex items-end justify-between mt-1">
                <h4 className="text-2xl font-bold font-display tracking-tight">{value}</h4>
                <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">{trend}</span>
            </div>
        </div>
    </motion.div>
)

const ModularPanel = ({ title, status, children }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-6 border-white/5"
    >
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-display">{title}</h3>
            <span className="text-[10px] uppercase font-bold text-white/20 tracking-widest italic">{status}</span>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </motion.div>
)

const StatusItem = ({ label, progress }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
            <span className="text-white/40">{label}</span>
            <span className="text-primary-gold">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                className="h-full bg-gradient-to-r from-primary-gold via-primary-bronze to-primary-gold bg-[length:200%_auto] animate-pulse-slow"
            />
        </div>
    </div>
)

export default AdminDashboard
