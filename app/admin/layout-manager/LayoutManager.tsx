'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, GripVertical } from 'lucide-react'
import { toggleSection, updateSectionOrder } from '@/app/actions/sections'

type Section = {
    id: string
    name: string
    isVisible: boolean
    order: number
}

export default function LayoutManager({ initialSections }: { initialSections: Section[] }) {
    const [sections, setSections] = useState(initialSections)

    const handleToggle = async (id: string, current: boolean) => {
        // Optimistic update
        const newStatus = !current
        setSections(sections.map(s => s.id === id ? { ...s, isVisible: newStatus } : s))
        await toggleSection(id, newStatus)
    }

    // Simple drag logic placeholder - for now just buttons to move up/down could suffice or simple list
    // Implementing full DnD might require dnd-kit, sticking to simple list for "finest detail" control first.

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-panel p-8">
                <h3 className="font-display font-bold text-xl text-white mb-6">Anasayfa Düzeni</h3>
                <div className="space-y-3">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            layout
                            className={`flex items-center justify-between p-4 rounded-xl border ${section.isVisible ? 'bg-white/5 border-white/10' : 'bg-black/20 border-white/5 opacity-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-white/20 cursor-grab active:cursor-grabbing">
                                    <GripVertical size={16} />
                                </div>
                                <span className="font-bold text-white text-sm">{section.name}</span>
                                <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">#{section.id}</span>
                            </div>

                            <button
                                onClick={() => handleToggle(section.id, section.isVisible)}
                                className={`p-2 rounded-lg transition-colors ${section.isVisible ? 'hover:bg-white/10 text-primary-gold' : 'hover:bg-white/10 text-white/40'}`}
                                title={section.isVisible ? 'Gizle' : 'Göster'}
                            >
                                {section.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </motion.div>
                    ))}
                </div>
                <p className="mt-4 text-xs text-white/30">* Sürükle-bırak sıralama özelliği yakında aktif olacak.</p>
            </div>

            <div className="glass-panel p-8 flex flex-col justify-center items-center text-center">
                <h3 className="font-display font-bold text-xl text-white mb-2">Canlı Önizleme</h3>
                <p className="text-white/40 text-sm mb-8">Düzen değişikliklerini anlık olarak kontrol edin.</p>

                <div className="w-[200px] h-[350px] border-4 border-white/10 rounded-2xl bg-black relative overflow-hidden flex flex-col scale-110">
                    <div className="h-4 bg-white/10 w-full mb-1" /> {/* Nav */}
                    <div className="flex-1 overflow-y-auto space-y-1 p-1 custom-scrollbar-hide">
                        {sections.filter(s => s.isVisible).map(s => (
                            <div key={s.id} className="w-full bg-white/5 rounded min-h-[40px] flex items-center justify-center text-[8px] text-white/30 uppercase border border-white/5">
                                {s.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
