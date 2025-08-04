import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import dynamic from 'next/dynamic'
import { Navigation, Footer } from '@/components/layout'
import { HeroSection } from '@/pages/home'

// Lazy load heavy components
const ServicesSection = dynamic(() => import('@/pages/services/ServicesSection'), {
  loading: () => <div className="h-96 bg-brand-black animate-pulse" />
})
const TestimonialsSection = dynamic(() => import('@/pages/home/TestimonialsSection'), {
  loading: () => <div className="h-96 bg-brand-black animate-pulse" />
})
const WorksSection = dynamic(() => import('@/pages/projects/WorksSection'), {
  loading: () => <div className="h-96 bg-brand-black animate-pulse" />
})
const FAQSection = dynamic(() => import('@/components/shared/FAQSection'), {
  loading: () => <div className="h-96 bg-brand-black animate-pulse" />
})
const AboutSection = dynamic(() => import('@/pages/about/AboutSection'), {
  loading: () => <div className="h-96 bg-brand-black animate-pulse" />
})

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(locales).map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const localeStr = locale as Locale

  if (!locales[localeStr]) {
    notFound()
  }

  return {
    title: localeStr === 'ar' 
      ? 'إغنايت للتسويق'
      : 'Ignite Marketing',
    description: localeStr === 'ar'
      ? 'مجموعة من المتخصصين في التسويق ذوي الخبرة من مصر، مستعدون لتحويل عملك باستراتيجيات رقمية مبتكرة تحقق نتائج حقيقية.'
      : 'A collective of experienced marketing professionals from Egypt, ready to transform your business with innovative digital solutions.',
    alternates: {
      canonical: `/${localeStr}`,
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const localeStr = locale as Locale

  if (!locales[localeStr]) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-brand-black">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorksSection />
      <TestimonialsSection />
      <FAQSection locale={localeStr} />
      <Footer locale={localeStr} />
    </main>
  )
} 