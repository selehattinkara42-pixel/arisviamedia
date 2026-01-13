'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Calendar, Trash2, CheckCircle, Search } from 'lucide-react'
import { markAsRead, deleteMessage } from '@/app/actions/inbox'

type Message = {
    id: number
    name: string
    email: string
    subject: string | null
    message: string
    status: string
    createdAt: Date
}

export default function InboxManager({ initialMessages }: { initialMessages: Message[] }) {
    const [messages, setMessages] = useState(initialMessages)
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [filter, setFilter] = useState('')

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(filter.toLowerCase()) ||
        m.email.toLowerCase().includes(filter.toLowerCase())
    )

    const selectedMessage = messages.find(m => m.id === selectedId)

    const handleRead = async (id: number) => {
        await markAsRead(id)
        setMessages(messages.map(m => m.id === id ? { ...m, status: 'READ' } : m))
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Mesajı silmek istediğinize emin misiniz?')) return
        await deleteMessage(id)
        setMessages(messages.filter(m => m.id !== id))
        if (selectedId === id) setSelectedId(null)
    }

    return (
        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
            {/* Message List */}
            <div className="lg:col-span-4 glass-panel flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                            type="text"
                            placeholder="Ara..."
                            className="w-full bg-white/5 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:bg-white/10 transition-colors"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {filteredMessages.map(msg => (
                        <button
                            key={msg.id}
                            onClick={() => { setSelectedId(msg.id); if (msg.status === 'UNREAD') handleRead(msg.id); }}
                            className={`w-full text-left p-4 rounded-xl transition-all border border-transparent ${selectedId === msg.id ? 'bg-primary-gold/10 border-primary-gold/30' : 'hover:bg-white/5'}`}
                        >
                            <div className="flex justify-between mb-1">
                                <span className={`text-sm font-bold ${msg.status === 'UNREAD' ? 'text-white' : 'text-white/60'}`}>{msg.name}</span>
                                <span className="text-[10px] text-white/30">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs text-white/40 truncate">{msg.subject || 'No Subject'}</p>
                            {msg.status === 'UNREAD' && <div className="w-2 h-2 rounded-full bg-primary-gold mt-2" />}
                        </button>
                    ))}
                    {filteredMessages.length === 0 && (
                        <div className="text-center text-white/20 py-10 text-sm">Mesaj bulunamadı.</div>
                    )}
                </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-8 glass-panel p-8 overflow-y-auto relative">
                {selectedMessage ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={selectedMessage.id}>
                        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-2">{selectedMessage.subject || 'Konu Yok'}</h2>
                                <div className="flex items-center gap-3 text-sm text-white/60">
                                    <span className="bg-white/10 px-2 py-1 rounded text-xs">{selectedMessage.name}</span>
                                    <span className="text-primary-gold">&lt;{selectedMessage.email}&gt;</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleDelete(selectedMessage.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-white/30 flex items-center gap-2">
                            <Calendar size={12} />
                            {new Date(selectedMessage.createdAt).toLocaleString()} tarihinde gönderildi.
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-white/20">
                        <Mail size={48} className="mb-4 opacity-50" />
                        <p>Görüntülemek için bir mesaj seçin.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
