
import { getPublicPackages } from '@/app/actions/public'
import PackagesSection from '@/components/home/PackagesSection'
import { getPageContent } from '@/app/actions/content'
import DynamicText from '@/components/ui/DynamicText'

export default async function PackagesPage() {
    const items = await getPublicPackages()
    const titleSmall = await getPageContent('packages_title_small')
    const titleLarge = await getPageContent('packages_title_large')

    // Helper to get text size class
    const getSize = (size?: string, defaultSize = 'text-base') => {
        if (!size) return defaultSize
        return size.startsWith('text-') ? size : `text-${size}`
    }

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <div className="container mx-auto px-6 mb-20">
                <h1 className={`hero-title mb-8 ${getSize(titleLarge?.fontSize, 'text-5xl md:text-8xl')}`}>
                    {titleLarge?.content ? (
                        (() => {
                            const lines = titleLarge.content.split('\n')
                            return lines.map((line, idx) => (
                                <span key={idx}>
                                    {idx === 0 ? (
                                        <>{line}<br /></>
                                    ) : (
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">
                                            {line}
                                        </span>
                                    )}
                                    {idx < lines.length - 1 && idx > 0 && <br />}
                                </span>
                            ))
                        })()
                    ) : (
                        <>
                            HİZMET <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">PAKETLERİ</span>
                        </>
                    )}
                </h1>

                <DynamicText
                    contentKey="packages_description"
                    defaultValue="Şeffaf fiyatlandırma, üstün hizmet kalitesi. İhtiyacınıza en uygun planı seçin."
                    className="text-white/40 max-w-2xl"
                    defaultSize="xl"
                />
            </div>

            <PackagesSection items={items} />
        </div>
    )
}
