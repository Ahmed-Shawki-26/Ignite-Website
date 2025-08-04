'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/i18n-client'

export default function TestPage() {
  const { locale, setLocale, isRTL } = useLanguage()
  const { t } = useTranslations(locale)

  return (
    <div className="min-h-screen bg-brand-black text-brand-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {locale === 'ar' ? 'اختبار النسخة العربية' : 'Arabic Version Test'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-brand-dark-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {locale === 'ar' ? 'معلومات اللغة' : 'Language Info'}
            </h2>
            <p><strong>{locale === 'ar' ? 'اللغة الحالية:' : 'Current Language:'}</strong> {locale}</p>
            <p><strong>{locale === 'ar' ? 'الاتجاه:' : 'Direction:'}</strong> {isRTL ? 'RTL' : 'LTR'}</p>
            <p><strong>{locale === 'ar' ? 'الخط:' : 'Font:'}</strong> {isRTL ? 'Cairo' : 'Inter'}</p>
          </div>
          
          <div className="bg-brand-dark-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {locale === 'ar' ? 'اختبار الترجمة' : 'Translation Test'}
            </h2>
            <p>{t('navigation.home')}</p>
            <p>{t('navigation.about')}</p>
            <p>{t('navigation.services')}</p>
            <p>{t('buttons.startProject')}</p>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
            className="bg-brand-red text-brand-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            {locale === 'ar' ? 'تبديل إلى الإنجليزية' : 'Switch to Arabic'}
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-brand-gray-100">
            {locale === 'ar' 
              ? 'إذا كنت ترى هذا النص باللغة العربية مع تخطيط من اليمين إلى اليسار، فإن النسخة العربية تعمل بشكل صحيح!'
              : 'If you can see this text in Arabic with right-to-left layout, the Arabic version is working correctly!'
            }
          </p>
        </div>
      </div>
    </div>
  )
} 