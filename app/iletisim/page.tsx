
import ContactPageClient from './ContactPageClient'
import { getPageContent } from '@/app/actions/content'

export default async function ContactPage() {
    // Fetch dynamic content
    const title = await getPageContent('contact_page_title')
    const description = await getPageContent('contact_page_description')

    // Additional contact labels
    const emailTitle = await getPageContent('contact_email_title')
    const phoneTitle = await getPageContent('contact_phone_title')
    const officeTitle = await getPageContent('contact_office_title')
    const formTitle = await getPageContent('contact_form_title')

    // Info Data
    const emailInfo = await getPageContent('contact_info_email')
    const emailDesc = await getPageContent('contact_info_email_desc')
    const phoneInfo = await getPageContent('contact_info_phone')
    const phoneDesc = await getPageContent('contact_info_phone_desc')
    const addressInfo = await getPageContent('contact_info_address')
    const addressDesc = await getPageContent('contact_info_address_desc')
    const mapIframe = await getPageContent('contact_info_map_iframe')

    return (
        <ContactPageClient
            content={{
                title,
                description,
                emailTitle,
                phoneTitle,
                officeTitle,
                formTitle,
                emailInfo,
                emailDesc,
                phoneInfo,
                phoneDesc,
                addressInfo,
                addressDesc,
                mapIframe
            }}
        />
    )
}
