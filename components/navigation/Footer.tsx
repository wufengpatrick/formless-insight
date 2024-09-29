'use client'

import Link from '../mdxcomponents/Link'
import siteMetadata from '@/data/siteMetadata'
import { maintitle } from '@/data/localeMetadata'
import SocialIcon from '@/components/social-icons'

import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

import { useContactModal } from '../formspree/store'
import { ContactModal } from '../formspree'

export default function Footer({ locale }) {
  const currentLocale = locale || 'en' // 确保 locale 有默认值

  const contactModal = useContactModal()

  const handleContactClick = (): void => {
    contactModal.onOpen()
  }
  function ContactClick(): void {
    handleContactClick()
  }

  return (
    <>
      <footer>
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-3 flex space-x-4">
            <div className="flex items-center"></div>
            <div className="flex items-center">
              <SocialIcon kind="x" href={siteMetadata.x} size={6} />
            </div>
            <div className="flex items-center">
              <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
            </div>
          </div>
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/">{maintitle[currentLocale] || maintitle['en']}</Link> {/* 确保有默认值 */}
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </footer>
      <ContactModal />
    </>
  )
}
