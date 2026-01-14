'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { unstable_cache } from "next/cache"

export type PageContentData = {
    id: number
    key: string
    content: string
    fontSize: string
    page: string
    section: string
    label: string
}

const DEFAULT_CONTENTS = [
    // GENEL METINLER
    {
        key: 'global_tab_away_message',
        content: 'Bizi unutma! ❤️ | Aris Via',
        fontSize: 'base',
        page: 'global',
        section: 'meta',
        label: 'Sekme Değişince Çıkan Mesaj'
    },

    // ANASAYFA - HERO
    {
        key: 'home_hero_title_small',
        content: 'YENİ NESİL DİJİTAL AJANS',
        fontSize: 'xs',
        page: 'home',
        section: 'hero',
        label: 'Hero Üst Başlık (Küçük)'
    },
    {
        key: 'home_hero_title_large',
        content: 'MARKANIZI ZİRVEYE TAŞIYORUZ',
        fontSize: '6xl',
        page: 'home',
        section: 'hero',
        label: 'Hero Ana Başlık'
    },
    {
        key: 'home_hero_description',
        content: 'Modern tasarım, güçlü strateji ve etkileyici içeriklerle dijital dünyada fark yaratın.',
        fontSize: 'xl',
        page: 'home',
        section: 'hero',
        label: 'Hero Açıklama'
    },
    {
        key: 'home_hero_button',
        content: 'HEMEN BAŞLA',
        fontSize: 'base',
        page: 'home',
        section: 'hero',
        label: 'Hero Buton Metni'
    },

    // ANASAYFA - HIZMETLER
    {
        key: 'home_services_title_small',
        content: 'HİZMETLERİMİZ',
        fontSize: 'xs',
        page: 'home',
        section: 'services',
        label: 'Hizmetler Üst Başlık'
    },
    {
        key: 'home_services_title_large',
        content: 'Neler Yapıyoruz?',
        fontSize: '4xl',
        page: 'home',
        section: 'services',
        label: 'Hizmetler Ana Başlık'
    },

    // ANASAYFA - PORTFOLYO
    {
        key: 'home_portfolio_title_small',
        content: 'SEÇKİN İŞLERİMİZ',
        fontSize: 'xs',
        page: 'home',
        section: 'portfolio',
        label: 'Portfolyo Üst Başlık'
    },
    {
        key: 'home_portfolio_title_large',
        content: 'PORTFOLYO',
        fontSize: '5xl',
        page: 'home',
        section: 'portfolio',
        label: 'Portfolyo Ana Başlık'
    },

    // ANASAYFA - REFERANSLAR
    {
        key: 'home_references_title',
        content: 'BİRLİKTE BÜYÜDÜĞÜMÜZ MARKALAR',
        fontSize: 'base',
        page: 'home',
        section: 'references',
        label: 'Referanslar Başlık'
    },

    // ANASAYFA - PAKETLER SECTION
    {
        key: 'packages_section_subtitle',
        content: 'Fiyatlandırma',
        fontSize: 'xs',
        page: 'home',
        section: 'packages',
        label: 'Paketler Bölüm Alt Başlık'
    },
    {
        key: 'packages_section_title',
        content: 'SİZE UYGUN PLAN',
        fontSize: '5xl',
        page: 'home',
        section: 'packages',
        label: 'Paketler Bölüm Ana Başlık'
    },

    // PAKETLER SAYFASI
    {
        key: 'packages_title_small',
        content: 'SİZE ÖZEL ÇÖZÜMLER',
        fontSize: 'xs',
        page: 'packages',
        section: 'header',
        label: 'Paketler Üst Başlık'
    },
    {
        key: 'packages_title_large',
        content: 'Başarıya Giden Yolda Size En Uygun Paketler',
        fontSize: '4xl',
        page: 'packages',
        section: 'header',
        label: 'Paketler Ana Başlık'
    },
    {
        key: 'packages_description',
        content: 'Şeffaf fiyatlandırma, üstün hizmet kalitesi. İhtiyacınıza en uygun planı seçin.',
        fontSize: 'xl',
        page: 'packages',
        section: 'header',
        label: 'Paketler Sayfa Açıklama'
    },

    // ILETISIM
    {
        key: 'contact_page_title',
        content: 'Bizimle İletişime Geçin',
        fontSize: '5xl',
        page: 'contact',
        section: 'header',
        label: 'İletişim Sayfa Başlığı'
    },
    {
        key: 'contact_page_description',
        content: 'Projeleriniz için bir kahve eşliğinde tanışalım.',
        fontSize: 'xl',
        page: 'contact',
        section: 'header',
        label: 'İletişim Sayfa Açıklaması'
    },
    {
        key: 'contact_email_title',
        content: 'Email',
        fontSize: 'base',
        page: 'contact',
        section: 'details',
        label: 'İletişim - Email Başlığı'
    },
    {
        key: 'contact_phone_title',
        content: 'Telefon',
        fontSize: 'base',
        page: 'contact',
        section: 'details',
        label: 'İletişim - Telefon Başlığı'
    },
    {
        key: 'contact_office_title',
        content: 'Ofis',
        fontSize: 'base',
        page: 'contact',
        section: 'details',
        label: 'İletişim - Ofis Başlığı'
    },
    {
        key: 'contact_form_title',
        content: 'Hemen İletişime Geçin',
        fontSize: '2xl',
        page: 'contact',
        section: 'form',
        label: 'İletişim Formu Başlığı'
    }
]

export async function getAllContent() {
    if (!prisma) return []
    try {
        const contents = await prisma.pageContent.findMany({
            orderBy: [{ page: 'asc' }, { section: 'asc' }, { key: 'asc' }]
        })
        return contents
    } catch (error) {
        console.error("Content fetch error:", error)
        return []
    }
}

export async function updateContent(id: number, content: string, fontSize: string) {
    if (!prisma) return { success: false, error: "DB connection failed" }

    try {
        const updated = await prisma.pageContent.update({
            where: { id },
            data: { content, fontSize }
        })
        revalidatePath('/')
        return { success: true, data: updated }
    } catch (error) {
        return { success: false, error: "Update failed" }
    }
}

// force: true gönderilirse var olanları da günceller!
export async function seedDefaultContent(force = false) {
    if (!prisma) return { success: false }

    let count = 0
    for (const item of DEFAULT_CONTENTS) {
        const exists = await prisma.pageContent.findUnique({
            where: { key: item.key }
        })

        if (!exists) {
            await prisma.pageContent.create({ data: item })
            count++
        } else if (force) {
            // Eğer zorla dersen, veritabanındaki kayıt yeni varsayılanla ezilir.
            await prisma.pageContent.update({
                where: { key: item.key },
                data: {
                    content: item.content,
                    fontSize: item.fontSize,
                    label: item.label, // Label da güncellensin
                    page: item.page,
                    section: item.section
                }
            })
            count++ // Buna da işlem yapıldı diyelim
        }
    }

    revalidatePath('/')
    return { success: true, count }
}

export const getPageContent = unstable_cache(
    async (key: string) => {
        if (!prisma) return null
        const item = await prisma.pageContent.findUnique({
            where: { key }
        })
        return item
    },
    ['page-content'],
    { tags: ['content'], revalidate: 60 }
)

export const getContentByPage = unstable_cache(
    async (page: string) => {
        if (!prisma) return []
        return await prisma.pageContent.findMany({
            where: { page }
        })
    },
    ['page-content-list'],
    { tags: ['content'], revalidate: 60 }
)
