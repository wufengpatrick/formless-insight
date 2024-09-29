import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './navigation/Footer'
import { ReactNode } from 'react'
import Header from './navigation/Header'
import { useRouter } from 'next/router'

interface LayoutWrapperProps {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const { locale } = useRouter() // 确保 locale 被定义

  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer locale={locale} /> // 使用 locale
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
