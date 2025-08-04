import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  const localeStr = locale as Locale

  if (!locales[localeStr]) {
    notFound()
  }

  return {
    title: {
      template: localeStr === 'ar' 
        ? '%s | فريق إغنايت للتسويق'
        : '%s | Ignite Marketing',
      default: localeStr === 'ar'
        ? 'فريق إغنايت للتسويق'
        : 'Ignite Marketing',
    },
    description: localeStr === 'ar'
      ? 'مجموعة من المتخصصين في التسويق ذوي الخبرة من مصر، مستعدون لتحويل عملك باستراتيجيات رقمية مبتكرة تحقق نتائج حقيقية.'
      : 'A collective of experienced marketing professionals from Egypt, ready to transform your business with innovative digital solutions.',
    keywords: localeStr === 'ar'
      ? 'التسويق الرقمي, تطوير المواقع, العلامة التجارية, التسويق في مصر, تسويق وسائل التواصل الاجتماعي, تحسين محركات البحث, الإعلانات'
      : 'digital marketing, web development, branding, Egypt marketing, social media marketing, SEO, advertising',
    authors: [{ name: localeStr === 'ar' ? 'فريق إغنايت للتسويق' : 'Ignite Marketing Team' }],
    openGraph: {
      title: localeStr === 'ar'
        ? 'إغنايت للتسويق'
        : 'Ignite Marketing',
      description: localeStr === 'ar'
        ? 'مجموعة من المتخصصين في التسويق ذوي الخبرة من مصر، مستعدون لتحويل عملك باستراتيجيات رقمية مبتكرة تحقق نتائج حقيقية.'
        : 'A collective of experienced marketing professionals from Egypt, ready to transform your business with innovative digital solutions.',
      locale: localeStr === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: localeStr === 'ar' ? 'en_US' : 'ar_EG',
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  const localeStr = locale as Locale

  if (!locales[localeStr]) {
    notFound()
  }

  return <>{children}</>
} 