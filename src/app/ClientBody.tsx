'use client'

import { useIsClient } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'

interface ClientBodyProps {
  children: React.ReactNode
}

export default function ClientBody({ children }: ClientBodyProps) {
  const isClient = useIsClient()
  const { locale, direction, isRTL } = useLanguage()

  // Update document direction and language
  useEffect(() => {
    if (isClient) {
      document.documentElement.lang = locale
      document.documentElement.dir = direction
      document.body.className = isRTL ? 'rtl' : 'ltr'
    }
  }, [locale, direction, isRTL, isClient])

  // Return a minimal loading state instead of null to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-brand-black">
        {/* Minimal loading state that matches the expected structure */}
      </div>
    )
  }

  return <>{children}</>
} 