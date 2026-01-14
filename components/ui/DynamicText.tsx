import { getPageContent } from '@/app/actions/content'

interface DynamicTextProps {
    contentKey: string
    defaultValue: string
    defaultSize?: string // Base Tailwind class (e.g. 'text-4xl')
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

export default async function DynamicText({
    contentKey,
    defaultValue,
    className = "",
    as: Tag = 'p',
    defaultSize = 'base' // Used only if DB has no specific size override logic matching className
}: DynamicTextProps) {

    const data = await getPageContent(contentKey)

    const text = data?.content || defaultValue
    const size = data?.fontSize || defaultSize

    // Map simplified size from DB (xs, sm, lg...) to Tailwind classes
    // This allows admin to pick "Small" and we render "text-sm"
    const sizeClass = size.startsWith('text-') ? size : `text-${size}`

    return (
        <Tag className={`${sizeClass} ${className}`}>
            {text}
        </Tag>
    )
}
