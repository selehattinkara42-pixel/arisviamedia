'use client'

import { useState } from 'react'
import { login } from '@/app/actions/auth'
import { motion } from 'framer-motion'
import { Lock, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        setError(null)

        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setIsLoading(false)
        }
        // Success redirects automatically
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-panel p-8 border border-white/10 rounded-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-gold to-primary-bronze rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary-gold/20">
                            <Lock className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-display font-bold text-white mb-2">Yönetim Paneli</h1>
                        <p className="text-white/40 text-sm">Devam etmek için lütfen şifrenizi girin.</p>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        <div>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Şifre"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-gold/50 transition-colors placeholder:text-white/20 text-center tracking-widest"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-premium w-full py-3 flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Giriş Yap <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-white/20 text-xs mt-8 uppercase tracking-widest">
                    Aris Via Media Security
                </p>
            </motion.div>
        </div>
    )
}
