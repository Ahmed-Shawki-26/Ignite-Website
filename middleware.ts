import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ar']
const defaultLocale = 'en'

// Simple locale detection from Accept-Language header
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || ''
  
  // Check if Arabic is preferred
  if (acceptLanguage.includes('ar') || acceptLanguage.includes('ar-EG')) {
    return 'ar'
  }
  
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  // Set locale in headers for use in components
  const locale = pathname.split('/')[1]
  const response = NextResponse.next()
  response.headers.set('x-locale', locale)
  
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
} 