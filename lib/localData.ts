// Local Storage based data management for when database is not available
// This allows the admin panel to work without a database connection

const STORAGE_KEYS = {
    HERO_CARDS: 'arisvia_hero_cards',
    PORTFOLIO: 'arisvia_portfolio',
    PACKAGES: 'arisvia_packages',
    TESTIMONIALS: 'arisvia_testimonials',
    SETTINGS: 'arisvia_settings'
}

// Default data
const defaultHeroCards = [
    { id: 1, title: "Hızlı Büyüme", description: "Dijital stratejilerle hızlı sonuçlar", icon: "Zap", iconColor: "#D4AF37", order: 0, isVisible: true },
    { id: 2, title: "Güvenilir Mimari", description: "Ölçeklenebilir altyapı çözümleri", icon: "Shield", iconColor: "#22D3EE", order: 1, isVisible: true },
    { id: 3, title: "Premium Sonuçlar", description: "Ölçülebilir başarı metrikleri", icon: "TrendingUp", iconColor: "#8B5CF6", order: 2, isVisible: true },
]

const defaultPortfolio = [
    { id: 1, title: "Elite Motors", description: "Lüks otomobil markası için kapsamlı dijital strateji", mediaUrl: "", category: "Branding", order: 0, isVisible: true },
    { id: 2, title: "Skyline Residence", description: "Prestijli gayrimenkul projesi için web tasarımı", mediaUrl: "", category: "Web Design", order: 1, isVisible: true },
    { id: 3, title: "Aurora Fashion", description: "Moda markası e-ticaret platformu", mediaUrl: "", category: "E-Commerce", order: 2, isVisible: true },
]

const defaultPackages = [
    { id: 1, name: "Starter", price: 15000, badge: null, features: ["Landing Page Tasarımı", "Responsive Geliştirme", "SEO Optimizasyonu", "1 Ay Destek"], isVisible: true },
    { id: 2, name: "Professional", price: 35000, badge: "En Popüler", features: ["5 Sayfalık Web Sitesi", "CMS Entegrasyonu", "Özel Animasyonlar", "SEO & Analytics", "3 Ay Destek"], isVisible: true },
    { id: 3, name: "Enterprise", price: 75000, badge: null, features: ["Sınırsız Sayfa", "E-Ticaret Entegrasyonu", "AI Özellikleri", "Özel Admin Panel", "12 Ay Destek"], isVisible: true },
]

const defaultTestimonials = [
    { id: 1, name: "Ahmet Yılmaz", role: "CEO", company: "TechVision", content: "Aris Via ile çalışmak, markamızı tamamen yeni bir seviyeye taşıdı.", avatarUrl: null, rating: 5, order: 0, isVisible: true },
    { id: 2, name: "Zeynep Kaya", role: "Pazarlama Direktörü", company: "Elite Motors", content: "Dijital dönüşüm sürecimizde en doğru partneri bulduk.", avatarUrl: null, rating: 5, order: 1, isVisible: true },
]

// Helper functions
export function getLocalData<T>(key: string, defaultData: T[]): T[] {
    if (typeof window === 'undefined') return defaultData
    try {
        const stored = localStorage.getItem(key)
        if (stored) {
            return JSON.parse(stored)
        }
    } catch (e) {
        console.error('Error reading from localStorage:', e)
    }
    return defaultData
}

export function setLocalData<T>(key: string, data: T[]): void {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.error('Error writing to localStorage:', e)
    }
}

// Hero Cards
export function getLocalHeroCards() {
    return getLocalData(STORAGE_KEYS.HERO_CARDS, defaultHeroCards)
}

export function setLocalHeroCards(cards: typeof defaultHeroCards) {
    setLocalData(STORAGE_KEYS.HERO_CARDS, cards)
}

// Portfolio
export function getLocalPortfolio() {
    return getLocalData(STORAGE_KEYS.PORTFOLIO, defaultPortfolio)
}

export function setLocalPortfolio(items: typeof defaultPortfolio) {
    setLocalData(STORAGE_KEYS.PORTFOLIO, items)
}

// Packages
export function getLocalPackages() {
    return getLocalData(STORAGE_KEYS.PACKAGES, defaultPackages)
}

export function setLocalPackages(items: typeof defaultPackages) {
    setLocalData(STORAGE_KEYS.PACKAGES, items)
}

// Testimonials
export function getLocalTestimonials() {
    return getLocalData(STORAGE_KEYS.TESTIMONIALS, defaultTestimonials)
}

export function setLocalTestimonials(items: typeof defaultTestimonials) {
    setLocalData(STORAGE_KEYS.TESTIMONIALS, items)
}

// Generate unique ID
export function generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000)
}

// Export defaults for server components
export const defaults = {
    heroCards: defaultHeroCards,
    portfolio: defaultPortfolio,
    packages: defaultPackages,
    testimonials: defaultTestimonials
}
