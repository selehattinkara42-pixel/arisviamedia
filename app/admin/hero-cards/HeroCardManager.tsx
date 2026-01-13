'use client'

import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import { Plus, Trash2, GripVertical, Save, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { getLocalHeroCards, setLocalHeroCards, generateId } from '@/lib/localData'

const availableIcons = ['Zap', 'Shield', 'TrendingUp', 'Sparkles', 'Star', 'Heart', 'Award', 'Crown', 'Diamond', 'Gem', 'Rocket', 'Target']
const colorPresets = ['#D4AF37', '#22D3EE', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899']

type HeroCard = {
    id: number
    title: string
    description: string | null
    icon: string
    iconColor: string
    order: number
    isVisible: boolean
}

export default function HeroCardManager({ initialCards }: { initialCards: HeroCard[] }) {
    const [cards, setCards] = useState<HeroCard[]>(initialCards)
    const [isAdding, setIsAdding] = useState(false)
    const [newCard, setNewCard] = useState({ title: '', description: '', icon: 'Zap', iconColor: '#D4AF37' })
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Load from localStorage on mount (client-side only)
    useEffect(() => {
        const localCards = getLocalHeroCards()
        if (localCards.length > 0) {
            setCards(localCards as HeroCard[])
        }
    }, [])

    // Save to localStorage whenever cards change
    useEffect(() => {
        if (cards.length > 0) {
            setLocalHeroCards(cards as any)
        }
    }, [cards])

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text })
        setTimeout(() => setMessage(null), 3000)
    }

    const handleCreate = async () => {
        if (!newCard.title.trim()) {
            showMessage('error', 'Başlık gerekli!')
            return
        }
        setSaving(true)

        const card: HeroCard = {
            id: generateId(),
            title: newCard.title,
            description: newCard.description || null,
            icon: newCard.icon,
            iconColor: newCard.iconColor,
            order: cards.length,
            isVisible: true
        }

        const newCards = [...cards, card]
        setCards(newCards)
        setNewCard({ title: '', description: '', icon: 'Zap', iconColor: '#D4AF37' })
        setIsAdding(false)
        setSaving(false)
        showMessage('success', 'Kart başarıyla oluşturuldu!')
    }

    const handleUpdate = (id: number, data: Partial<HeroCard>) => {
        setCards(cards.map(c => c.id === id ? { ...c, ...data } : c))
    }

    const handleDelete = (id: number) => {
        if (!confirm('Bu kartı silmek istediğinize emin misiniz?')) return
        setCards(cards.filter(c => c.id !== id))
        showMessage('success', 'Kart silindi.')
    }

    const handleReorder = (newOrder: HeroCard[]) => {
        const reordered = newOrder.map((card, index) => ({ ...card, order: index }))
        setCards(reordered)
    }

    const getIconComponent = (iconName: string) => {
        const Icon = (LucideIcons as any)[iconName] || LucideIcons.Zap
        return Icon
    }

    return (
        <div className="space-y-6">
            {/* Toast Message */}
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`fixed top-24 right-8 z-[200] px-6 py-3 rounded-xl flex items-center gap-3 shadow-lg ${message.type === 'success'
                            ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                            : 'bg-red-500/20 border border-red-500/50 text-red-400'
                        }`}
                >
                    {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </motion.div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Hero Kartları</h2>
                    <p className="text-white/50 text-sm mt-1">Ana sayfadaki yüzen kartları yönetin • {cards.length} kart</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-gold text-black font-bold rounded-xl hover:bg-primary-gold/90 transition-colors"
                >
                    <Plus size={18} />
                    Yeni Kart
                </button>
            </div>

            {/* Info Banner */}
            <div className="glass-card p-4 border-blue-500/30 bg-blue-500/5">
                <p className="text-blue-400 text-sm">
                    💡 Kartlar tarayıcınızda kaydedilir. Sayfayı yenileseniz bile veriler korunur.
                </p>
            </div>

            {/* Add New Card Form */}
            {isAdding && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 space-y-4"
                >
                    <h3 className="font-bold text-lg">Yeni Kart Ekle</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Başlık *</label>
                            <input
                                type="text"
                                value={newCard.title}
                                onChange={e => setNewCard({ ...newCard, title: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary-gold/50 focus:outline-none text-white"
                                placeholder="Kart başlığı..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Açıklama</label>
                            <input
                                type="text"
                                value={newCard.description}
                                onChange={e => setNewCard({ ...newCard, description: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary-gold/50 focus:outline-none text-white"
                                placeholder="Kısa açıklama..."
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">İkon</label>
                            <div className="flex flex-wrap gap-2">
                                {availableIcons.map(icon => {
                                    const IconComp = getIconComponent(icon)
                                    return (
                                        <button
                                            key={icon}
                                            onClick={() => setNewCard({ ...newCard, icon })}
                                            className={`p-2 rounded-lg border transition-all ${newCard.icon === icon
                                                    ? 'border-primary-gold bg-primary-gold/20'
                                                    : 'border-white/10 hover:border-white/30'
                                                }`}
                                        >
                                            <IconComp size={20} style={{ color: newCard.iconColor }} />
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Renk</label>
                            <div className="flex flex-wrap gap-2">
                                {colorPresets.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setNewCard({ ...newCard, iconColor: color })}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${newCard.iconColor === color
                                                ? 'border-white scale-110'
                                                : 'border-transparent hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleCreate}
                            disabled={saving || !newCard.title.trim()}
                            className="flex items-center gap-2 px-6 py-2 bg-primary-gold text-black font-bold rounded-xl hover:bg-primary-gold/90 disabled:opacity-50 transition-all"
                        >
                            <Save size={16} />
                            {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                        >
                            İptal
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Cards List */}
            <Reorder.Group axis="y" values={cards} onReorder={handleReorder} className="space-y-3">
                {cards.map((card) => {
                    const IconComp = getIconComponent(card.icon)
                    return (
                        <Reorder.Item key={card.id} value={card}>
                            <motion.div
                                layout
                                className={`glass-card p-4 flex items-center gap-4 ${!card.isVisible ? 'opacity-50' : ''}`}
                            >
                                {/* Drag Handle */}
                                <div className="cursor-grab active:cursor-grabbing text-white/30 hover:text-white/60">
                                    <GripVertical size={20} />
                                </div>

                                {/* Icon Preview */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5"
                                    style={{ borderColor: card.iconColor + '40', borderWidth: 1 }}
                                >
                                    <IconComp size={24} style={{ color: card.iconColor }} />
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        value={card.title}
                                        onChange={e => handleUpdate(card.id, { title: e.target.value })}
                                        className="bg-transparent font-bold text-white focus:outline-none focus:text-primary-gold w-full"
                                    />
                                    <input
                                        type="text"
                                        value={card.description || ''}
                                        onChange={e => handleUpdate(card.id, { description: e.target.value })}
                                        className="bg-transparent text-sm text-white/50 focus:outline-none focus:text-white/70 w-full"
                                        placeholder="Açıklama ekle..."
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleUpdate(card.id, { isVisible: !card.isVisible })}
                                        className={`p-2 rounded-lg transition-colors ${card.isVisible ? 'text-primary-gold hover:bg-primary-gold/20' : 'text-white/30 hover:bg-white/10'
                                            }`}
                                        title={card.isVisible ? 'Gizle' : 'Göster'}
                                    >
                                        {card.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(card.id)}
                                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                                        title="Sil"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        </Reorder.Item>
                    )
                })}
            </Reorder.Group>

            {cards.length === 0 && !isAdding && (
                <div className="text-center py-12 text-white/40">
                    <p>Henüz kart eklenmemiş.</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="mt-4 text-primary-gold hover:underline"
                    >
                        İlk kartı ekle →
                    </button>
                </div>
            )}
        </div>
    )
}
