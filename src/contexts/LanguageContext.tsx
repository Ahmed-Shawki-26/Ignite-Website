'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Locale, locales, defaultLocale } from '@/lib/i18n'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  isRTL: boolean
  direction: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  // Extract locale from pathname
  useEffect(() => {
    if (pathname) {
      const pathLocale = pathname.split('/')[1] as Locale
      if (pathLocale && locales[pathLocale]) {
        setLocaleState(pathLocale)
      }
    }
  }, [pathname])

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return

    // Update the URL to reflect the new locale
    const currentPath = pathname || ''
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '')
    const newPath = `/${newLocale}${pathWithoutLocale}`
    
    router.push(newPath)
    setLocaleState(newLocale)
  }

  const isRTL = locale === 'ar'
  const direction = isRTL ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isRTL, direction }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 