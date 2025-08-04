'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n-client';

interface LayoutProps {
  children: ReactNode;
  locale: 'en' | 'ar';
  title?: string;
  description?: string;
}

export default function Layout({ children, locale }: LayoutProps) {
  const { t } = useTranslations(locale);

  // Set document direction based on locale
  const isRTL = locale === 'ar';

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} style={{ backgroundColor: '#0F0F0F', color: '#FFFFFF' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 nav-bar" style={{ borderBottom: '1px solid #333333' }}>
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold" style={{ color: '#B8001F' }}>Ignite</div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.home')}</Link>
              <Link href="/services" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.services')}</Link>
              <Link href="/portfolio" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.portfolio')}</Link>
              <Link href="/about" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.about')}</Link>
              <Link href="/contact" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.contact')}</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-sm transition-colors text-grey-70 hover:text-primary-red">
                {locale === 'en' ? 'العربية' : 'English'}
              </button>
              <button className="btn-primary">
                {t('buttons.startProject')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer" style={{ borderTop: '1px solid #333333' }}>
        <div className="container-custom" style={{ padding: '48px 16px' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#B8001F' }}>Ignite</h3>
              <p className="mb-4" style={{ color: '#B3B3D2' }}>
                {t('company.description')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="transition-colors text-grey-70 hover:text-primary-red">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="transition-colors text-grey-70 hover:text-primary-red">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="transition-colors text-grey-70 hover:text-primary-red">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.home')}</Link></li>
                <li><Link href="/services" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.services')}</Link></li>
                <li><Link href="/portfolio" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.portfolio')}</Link></li>
                <li><Link href="/about" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.about')}</Link></li>
                <li><Link href="/contact" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('navigation.contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>{t('footer.services')}</h4>
              <ul className="space-y-2">
                <li><Link href="/services/web-development" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('services.webDevelopment')}</Link></li>
                <li><Link href="/services/digital-marketing" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('services.digitalMarketing')}</Link></li>
                <li><Link href="/services/seo" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('services.seo')}</Link></li>
                <li><Link href="/services/social-media" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('services.socialMedia')}</Link></li>
                <li><Link href="/services/branding" className="transition-colors hover:text-primary-red" style={{ color: '#B3B3D2' }}>{t('services.branding')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>{t('contact.contactInfo')}</h4>
              <div className="space-y-2" style={{ color: '#B3B3D2' }}>
                <p>info@ignitemarketing.com</p>
                <p>+1 (555) 123-4567</p>
                <p>123 Business St, Suite 100<br />New York, NY 10001</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 text-center" style={{ borderTop: '1px solid #333333', color: '#B3B3D2' }}>
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 