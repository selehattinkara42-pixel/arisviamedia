
import ContactPageClient from './ContactPageClient'
import { getPageContent } from '@/app/actions/content'

export default async function ContactPage() {
    // Fetch dynamic content
    const title = await getPageContent('contact_page_title')
    const description = await getPageContent('contact_page_description')

    // Additional contact labels if we want to make them dynamic too
    const emailTitle = await getPageContent('contact_email_title')
    const phoneTitle = await getPageContent('contact_phone_title')
    const officeTitle = await getPageContent('contact_office_title')
    const formTitle = await getPageContent('contact_form_title')

    return (
        <ContactPageClient
            content={{
                title,
                description,
                emailTitle,
                phoneTitle,
                officeTitle,
                formTitle
            }}
        />
    )
}
