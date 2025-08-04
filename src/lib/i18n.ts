import { createInstance } from 'i18next';

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
export type Direction = 'ltr' | 'rtl';

export const locales: Record<Locale, { name: string; flag: string; dir: Direction }> = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  ar: {
    name: 'العربية',
    flag: '🇪🇬',
    dir: 'rtl',
  },
};

export const defaultLocale: Locale = 'en';

// Create i18n instance for server-side
const i18n = createInstance({
  resources,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  debug: process.env.NODE_ENV === 'development',
  
  interpolation: {
    escapeValue: false, // React already escapes values
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

// Initialize i18n (without react-i18next)
i18n.init();

export default i18n;

// Server-side translation function
export function t(key: string, locale: Locale, options?: Record<string, unknown>): string {
  return i18n.t(key, { lng: locale, ...options }) as string;
}

// Utility functions
export function getDirection(locale: Locale): Direction {
  return locales[locale].dir;
}

export function getLocaleName(locale: Locale): string {
  return locales[locale].name;
}

export function getLocaleFlag(locale: Locale): string {
  return locales[locale].flag;
}

export function isValidLocale(locale: string): locale is Locale {
  return locale in locales;
}

// Format number based on locale
export function formatNumber(num: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US').format(num);
}

// Format date based on locale
export function formatDate(date: Date, locale: Locale, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    { ...defaultOptions, ...options }
  ).format(date);
}

// Format currency based on locale
export function formatCurrency(amount: number, locale: Locale, currency: string = 'EGP'): string {
  return new Intl.NumberFormat(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    {
      style: 'currency',
      currency,
    }
  ).format(amount);
}

// RTL utilities
export function isRTL(locale: Locale): boolean {
  return getDirection(locale) === 'rtl';
}

export function getRTLClass(locale: Locale): string {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

// Language switching utilities
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'ar' : 'en';
}

export function getAlternatePath(currentPath: string, currentLocale: Locale): string {
  const alternateLocale = getAlternateLocale(currentLocale);
  
  // Remove current locale from path if present
  const pathWithoutLocale = currentPath.replace(`/${currentLocale}`, '');
  
  // Add alternate locale
  return `/${alternateLocale}${pathWithoutLocale}`;
}

// SEO utilities for multilingual content
export function getAlternateLanguages(currentPath: string, currentLocale: Locale) {
  const alternateLocale = getAlternateLocale(currentLocale);
  const alternatePath = getAlternatePath(currentPath, currentLocale);
  
  return {
    [currentLocale]: `${process.env.NEXT_PUBLIC_SITE_URL}${currentPath}`,
    [alternateLocale]: `${process.env.NEXT_PUBLIC_SITE_URL}${alternatePath}`,
  };
}

// Validation messages
export const validationMessages = {
  en: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    minLength: (min: number) => `Must be at least ${min} characters`,
    maxLength: (max: number) => `Must be no more than ${max} characters`,
  },
  ar: {
    required: 'هذا الحقل مطلوب',
    email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    phone: 'يرجى إدخال رقم هاتف صحيح',
    minLength: (min: number) => `يجب أن يكون على الأقل ${min} أحرف`,
    maxLength: (max: number) => `يجب ألا يزيد عن ${max} أحرف`,
  },
};

// Common translations for dynamic content
export const commonTranslations = {
  en: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    all: 'All',
    none: 'None',
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    open: 'Open',
    more: 'More',
    less: 'Less',
    readMore: 'Read More',
    showMore: 'Show More',
    showLess: 'Show Less',
  },
  ar: {
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تم بنجاح!',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    submit: 'إرسال',
    reset: 'إعادة تعيين',
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    all: 'الكل',
    none: 'لا شيء',
    yes: 'نعم',
    no: 'لا',
    close: 'إغلاق',
    open: 'فتح',
    more: 'المزيد',
    less: 'أقل',
    readMore: 'اقرأ المزيد',
    showMore: 'عرض المزيد',
    showLess: 'عرض أقل',
  },
}; 