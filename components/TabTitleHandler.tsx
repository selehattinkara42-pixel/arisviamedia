'use client'

import { useEffect, useState } from 'react'
import { PageContentData } from '@/app/actions/content'

export default function TabTitleHandler({ awayMessage }: { awayMessage?: PageContentData | null }) {

    useEffect(() => {
        const originalTitle = document.title
        const message = awayMessage?.content || "Seni özledik! ❤️"

        const handleVisibilityChange = () => {
            if (document.hidden) {
                document.title = message
            } else {
                document.title = originalTitle
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            document.title = originalTitle
        }
    }, [awayMessage])

    return null
}
