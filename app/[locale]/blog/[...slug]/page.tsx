import 'css/prism.css'
import 'katex/dist/katex.css'
import { Metadata } from 'next'
import { components } from '@/components/mdxcomponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import siteMetadata from '@/data/siteMetadata'
import { maintitle } from '@/data/localeMetadata'
import { notFound } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

// 定义默认布局
const defaultLayout = 'PostBanner'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

interface BlogPageProps {
  params: { slug: string[]; locale: LocaleTypes }
}

// 统一 slug 处理函数，确保 slug 是 URL-safe 的
function normalizeSlug(slug: string[]): string {
  return decodeURI(slug.join('/')).replace(/\s+/g, '-').toLowerCase()
}

async function getPostFromParams({ params: { slug, locale } }: BlogPageProps): Promise<any> {
  const dslug = normalizeSlug(slug)
  const post = allBlogs.filter((p) => p.language === locale).find((p) => p.slug === dslug) as Blog

  if (!post) {
    return null
  }

  // 处理系列文章
  if (post?.series) {
    const seriesPosts = allBlogs
      .filter((p) => p.language === locale && p.series?.title === post.series?.title)
      .sort((a, b) => Number(a.series!.order) - Number(b.series!.order))
      .map((p) => ({
        title: p.title,
        slug: p.slug,
        language: p.language,
        isCurrent: p.slug === post.slug,
      }))
    if (seriesPosts.length > 0) {
      return { ...post, series: { ...post.series, posts: seriesPosts } }
    }
  }

  return post
}

export async function generateMetadata({
  params: { slug, locale },
}: BlogPageProps): Promise<Metadata | undefined> {
  const dslug = normalizeSlug(slug)
  const post = allBlogs.find((p) => p.slug === dslug && p.language === locale) as Blog
  if (!post) {
    return
  }

  const author = allAuthors.filter((a) => a.language === locale).find((a) => a.default === true)
  const authorList = post.authors || [author?.slug]
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors
      .filter((a) => a.language === locale)
      .find((a) => a.slug.includes(author))
    return coreContent(authorResults as Authors)
  })

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => ({
    url: img.includes('http') ? img : siteMetadata.siteUrl + img,
  }))

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: maintitle[locale],
      locale: post.language,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: `${siteMetadata.siteUrl}/${locale}/blog/${dslug}`,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({
    slug: p.slug.split('/').map((segment) => segment.replace(/\s+/g, '-').toLowerCase()), // 处理 slug
    locale: p.language,
  }))
  return paths
}

export default async function Page({ params: { slug, locale } }: BlogPageProps) {
  const dslug = normalizeSlug(slug)

  // 过滤掉 production 环境中的草稿 + locale 过滤
  const sortedCoreContents = allCoreContent(
    sortPosts(allBlogs.filter((p) => p.language === locale))
  )
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === dslug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = await getPostFromParams({ params: { slug, locale } })

  // 如果找不到对应的文章
  if (!post) {
    return notFound()
  }

  const author = allAuthors.filter((a) => a.language === locale).find((a) => a.default === true)
  const authorList = post.authors || [author?.slug]
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors
      .filter((a) => a.language === locale)
      .find((a) => a.slug.includes(author))
    return coreContent(authorResults as Authors)
  })

  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => ({
    '@type': 'Person',
    name: author.name,
  }))

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
        params={{ locale }}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
