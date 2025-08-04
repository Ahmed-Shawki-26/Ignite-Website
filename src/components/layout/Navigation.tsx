'use client'

import { useState } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/i18n-client'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { locale, setLocale, isRTL } = useLanguage()
  const { t } = useTranslations(locale)

  const menuItems = [
    { label: t('navigation.home'), href: '#home', isPage: false },
    { label: t('navigation.about'), href: '#about', isPage: false },
    { label: t('navigation.services'), href: '#services', isPage: false },
    { label: t('navigation.portfolio'), href: '#projects', isPage: false },
    { label: t('navigation.blog'), href: '#home', isPage: false }, // Temporarily scroll to home until blog section is created
    { label: t('navigation.contact'), href: '/contact', isPage: true },
  ]

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en'
    
    // Update the URL first, then refresh
    const currentPath = window.location.pathname
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '')
    const newPath = `/${newLocale}${pathWithoutLocale}`
    
    // Navigate to the new URL and then refresh
    window.location.href = newPath
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isPage: boolean) => {
    if (isPage) {
      // For page navigation, let the link handle it naturally
      return
    }
    
    e.preventDefault()
    
    // Check if we're on the home page
    const isOnHomePage = window.location.pathname.endsWith(`/${locale}`) || window.location.pathname === `/${locale}/`
    
    if (isOnHomePage) {
      // We're on home page, try to scroll to section
      const targetSection = document.querySelector(href)
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        // If section doesn't exist, scroll to top of page
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        })
      }
    } else {
      // We're on another page (like contact), redirect to home page with section
      window.location.href = `/${locale}${href}`
    }
    
    // Close mobile menu if open
    setIsMenuOpen(false)
  }

  return (
    <nav className={`fixed top-4 ${isRTL ? 'right-1/2 transform translate-x-1/2' : 'left-1/2 transform -translate-x-1/2'} z-50 w-[98%]`}>
      <div className="bg-brand-black/50 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between h-14 lg:h-14 px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={`/${locale}`}
              className="transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <Image
                src="/Logo/8.png"
                alt="Ignite Logo"
                width={120}
                height={40}
                className="h-6 lg:h-8 w-auto"
                priority
              />
            </Link>
          </div>

                    {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className={`flex items-center ${isRTL ? 'gap-8' : 'gap-8'}`}>
              {menuItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.label}
                    href={`/${locale}${item.href}`}
                    className="relative text-brand-white hover:text-red-500 transition-colors duration-300 font-medium whitespace-nowrap group pb-1 cursor-pointer"
                  >
                    {item.label}
                    {/* Animated underline */}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-out group-hover:w-full ${isRTL ? 'origin-right' : 'origin-left'}`}></span>
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isPage)}
                    className="relative text-brand-white hover:text-red-500 transition-colors duration-300 font-medium whitespace-nowrap group pb-1 cursor-pointer"
                  >
                    {item.label}
                    {/* Animated underline */}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-out group-hover:w-full ${isRTL ? 'origin-right' : 'origin-left'}`}></span>
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Language Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-brand-white hover:text-red-500 transition-colors duration-300 cursor-pointer"
            >
              <Globe size={16} />
              <span className="font-medium">{locale.toUpperCase()}</span>
            </button>
            <button className="bg-red-600 text-brand-white font-semibold py-1.5 px-4 rounded-lg transition-all duration-300 hover:bg-red-700 text-sm cursor-pointer">
              {t('buttons.startProject')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-brand-white hover:text-red-500 transition-colors duration-300 cursor-pointer"
            >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-white hover:text-red-500 transition-colors duration-300 cursor-pointer"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-brand-black/60 backdrop-blur-2xl border-t border-white/20 rounded-b-full mt-2">
            <div className="px-6 py-6 space-y-4">
              {menuItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.label}
                    href={`/${locale}${item.href}`}
                    className="block text-brand-white hover:text-red-500 transition-colors duration-300 font-medium py-2 cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isPage)}
                    className="block text-brand-white hover:text-red-500 transition-colors duration-300 font-medium py-2 cursor-pointer"
                  >
                    {item.label}
                  </a>
                )
              ))}
              <button className="bg-red-600 text-brand-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-red-700 text-sm w-full mt-4 cursor-pointer">
                {t('buttons.startProject')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 