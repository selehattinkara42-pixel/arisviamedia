
import { getPublicPackages } from '@/app/actions/public'
import PackagesSection from '@/components/home/PackagesSection'
import { getPageContent } from '@/app/actions/content'
import DynamicText from '@/components/ui/DynamicText'

export default async function PackagesPage() {
    const items = await getPublicPackages()
    const titleSmall = await getPageContent('packages_title_small')
    const titleLarge = await getPageContent('packages_title_large')

    // Helper to get text size class
    const getSize = (size?: string, defaultSize = 'text-8xl') => {
        if (!size) return `md:${defaultSize}`
        const desktopClass = size.startsWith('text-') ? size : `text-${size}`
        return `md:${desktopClass}`
    }

    return (
        <div className="pt-32 pb-20 bg-background min-h-screen">
            <div className="container mx-auto px-6 mb-20">
                <h1 className={`hero-title mb-8 font-bold text-3xl sm:text-4xl leading-tight ${getSize(titleLarge?.fontSize, 'text-8xl')}`}>
                    {titleLarge?.content ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-white italic font-display">
                            <span dangerouslySetInnerHTML={{ __html: titleLarge.content.replace(/\n/g, '<br/>') }} />
                        </span>
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
