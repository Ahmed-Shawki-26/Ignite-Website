'use client';

import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from '../../public/locales/en/common.json';
import arCommon from '../../public/locales/ar/common.json';
import enPages from '../../public/locales/en/pages.json';
import arPages from '../../public/locales/ar/pages.json';
import enForms from '../../public/locales/en/forms.json';
import arForms from '../../public/locales/ar/forms.json';

const resources = {
  en: {
    common: enCommon,
    pages: enPages,
    forms: enForms,
  },
  ar: {
    common: arCommon,
    pages: arPages,
    forms: arForms,
  },
};

export type Locale = 'en' | 'ar';

// Create i18n instance for client-side
const i18n = createInstance({
  resources,
  lng: 'en', // Will be set dynamically
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  
  react: {
    useSuspense: false,
  },
  
  // Namespace configuration
  ns: ['common', 'pages', 'forms'],
  defaultNS: 'common',
  
  // Key separator
  keySeparator: '.',
  
  // Plural rules
  pluralSeparator: '_',
  contextSeparator: '_',
});

// Initialize i18n with react-i18next
i18n.use(initReactI18next).init();

export default i18n;

// Client-side hook for translations
export function useTranslations(locale?: Locale) {
  return {
    t: (key: string, options?: Record<string, unknown>) => i18n.t(key, { lng: locale, ...options }) as string,
  };
} 