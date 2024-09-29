import { Metadata as NextMetadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

type LocaleMetadata = {
  [locale: string]: string
}

export const maintitle: LocaleMetadata = {
  en: 'Formless Insights | Macro · Industry · Company Analysis Without Limits',
  'zh-CN': '无垠智域 | 宏观·产业·公司的无界洞察',
}

export const maindescription: LocaleMetadata = {
  en: 'Comprehensive analysis integrating macroeconomics, industry dynamics, and corporate strategy. Through boundless insights, we uncover market trends and provide expansive business intelligence for decision-makers.',
  'zh-CN':
    '融合宏观经济、产业动态和公司战略的全面分析。通过无垠智域，揭示市场趋势，为决策者提供广阔的商业智慧。',
}

// 定义支持的语言类型
export type LocaleTypes = keyof typeof maintitle

// 辅助函数来安全地获取本地化字符串
function getLocalizedString(obj: LocaleMetadata, locale: LocaleTypes): string {
  return obj[locale] || obj['en'] // 默认使用英语
}

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  params: { locale: LocaleTypes }
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  params: { locale },
  ...rest
}: PageSEOProps): NextMetadata {
  const localizedTitle = getLocalizedString(maintitle, locale)
  const localizedDescription = description || getLocalizedString(maindescription, locale)

  return {
    title,
    description: localizedDescription,
    openGraph: {
      title: `${title} | ${localizedTitle}`,
      description: localizedDescription,
      url: './',
      siteName: localizedTitle,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: typeof locale === 'string' ? locale : undefined, // 修改此行
      type: 'website',
    },
    twitter: {
      title: `${title} | ${localizedTitle}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
