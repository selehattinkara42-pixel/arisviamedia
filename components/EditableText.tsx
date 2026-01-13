'use client'

import React, { useState, useEffect } from 'react'
import { updateContent } from '@/app/actions/content'
import { Edit2, Check, ExternalLink } from 'lucide-react'

// This component acts as a wrapper for editable text on the frontend
export default function EditableText({
    id,
    initialValue,
    className,
    type = 'text',
    isAdmin = false // Ideally checked via auth context
}: {
    id: string,
    initialValue: string,
    className?: string,
    type?: 'text' | 'textarea',
    isAdmin?: boolean
}) {
    const [value, setValue] = useState(initialValue)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // Sync with prop changes if needed (optional)
    useEffect(() => setValue(initialValue), [initialValue])

    const handleSave = async () => {
        setIsSaving(true)
        await updateContent(id, value)
        setIsSaving(false)
        setIsEditing(false)
    }

    if (!isAdmin && !isEditing) {
        return <span className={className} dangerouslySetInnerHTML={{ __html: value }} />
    }

    return (
        <div className={`relative group ${isEditing ? 'z-50' : ''}`}>
            {/* Edit Trigger */}
            {isAdmin && !isEditing && (
                <button
                    onClick={(e) => { e.preventDefault(); setIsEditing(true); }}
                    className="absolute -top-3 -right-3 p-1 bg-primary-gold text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Metni Düzenle"
                >
                    <Edit2 size={12} />
                </button>
            )}

            {isEditing ? (
                <div className="absolute inset-0 min-w-[300px] min-h-[50px] z-50">
                    {type === 'textarea' ? (
                        <textarea
                            autoFocus
                            className="w-full h-full min-h-[100px] p-2 bg-black/90 border border-primary-gold rounded text-white text-sm"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    ) : (
                        <input
                            autoFocus
                            type="text"
                            className="w-full p-2 bg-black/90 border border-primary-gold rounded text-white text-sm"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    )}
                    <div className="absolute -bottom-8 right-0 flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="px-2 py-1 bg-red-500 rounded text-xs text-white font-bold">İptal</button>
                        <button onClick={handleSave} className="px-2 py-1 bg-green-500 rounded text-xs text-white font-bold flex items-center gap-1">
                            {isSaving ? '...' : <Check size={12} />} Kaydet
                        </button>
                    </div>
                </div>
            ) : (
                <span className={className} dangerouslySetInnerHTML={{ __html: value }} />
            )}
        </div>
    )
}
