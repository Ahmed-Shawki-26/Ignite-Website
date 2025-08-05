'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, User, MessageSquare, Sparkles } from 'lucide-react';

const freeTrialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Description must be at least 10 characters'),
});

type FreeTrialFormData = z.infer<typeof freeTrialSchema>;

interface FreeTrialFormProps {
  locale: 'en' | 'ar';
}

export default function FreeTrialForm({ locale }: FreeTrialFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FreeTrialFormData>({
    resolver: zodResolver(freeTrialSchema),
  });

  const services = [
    { value: 'web-development', label: locale === 'ar' ? 'تطوير المواقع' : 'Web Development' },
    { value: 'digital-marketing', label: locale === 'ar' ? 'التسويق الرقمي' : 'Digital Marketing' },
    { value: 'branding', label: locale === 'ar' ? 'العلامة التجارية' : 'Branding' },
    { value: 'social-media', label: locale === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social Media' },
    { value: 'seo', label: locale === 'ar' ? 'تحسين محركات البحث' : 'SEO' },
    { value: 'consulting', label: locale === 'ar' ? 'الاستشارات' : 'Consulting' },
  ];

  const onSubmit = async (data: FreeTrialFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact/free-trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: 'free-trial',
          language: locale,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center mb-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className={`bg-red-500/20 p-3 rounded-full ${locale === 'ar' ? 'mr-0' : 'ml-0'}`}>
          <Sparkles className="w-6 h-6" style={{ color: '#B8001F' }} />
        </div>
        <div className={`${locale === 'ar' ? 'mr-3' : 'ml-3'}`}>
          <h3 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
            {locale === 'ar' ? 'جرب خدماتنا مجاناً' : 'Try Our Services Free'}
          </h3>
          <p className="text-sm" style={{ color: '#B3B3D2' }}>
            {locale === 'ar' 
              ? 'احصل على تجربة مجانية لمدة 7 أيام'
              : 'Get a 7-day free trial of our services'
            }
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
            {locale === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
          </label>
          <div className="relative">
            <User className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 ${locale === 'ar' ? 'right-4' : 'left-4'}`} style={{ color: '#B8001F' }} />
            <input
              {...register('name')}
              type="text"
              className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 border-white/20 text-white placeholder-white/50 ${
                errors.name ? 'border-red-500' : ''
              } ${locale === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              placeholder={locale === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm" style={{ color: '#B8001F' }}>{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
            {locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
          </label>
          <div className="relative">
            <Mail className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 ${locale === 'ar' ? 'right-4' : 'left-4'}`} style={{ color: '#B8001F' }} />
            <input
              {...register('email')}
              type="email"
              className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 border-white/20 text-white placeholder-white/50 ${
                errors.email ? 'border-red-500' : ''
              } ${locale === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm" style={{ color: '#B8001F' }}>{errors.email.message}</p>
          )}
        </div>

        {/* Service Field */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
            {locale === 'ar' ? 'الخدمة المطلوبة' : 'Service Type'} *
          </label>
                  <select
          {...register('service')}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 border-white/20 text-white appearance-none ${
            errors.service ? 'border-red-500' : ''
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23B8001F' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: locale === 'ar' ? 'left 0.5rem center' : 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: locale === 'ar' ? '1rem' : '2.5rem',
            paddingLeft: locale === 'ar' ? '2.5rem' : '1rem'
          }}
        >
            <option value="" style={{ backgroundColor: '#1A1A1A' }}>{locale === 'ar' ? 'اختر الخدمة' : 'Select a service'}</option>
            {services.map((service) => (
              <option key={service.value} value={service.value} style={{ backgroundColor: '#1A1A1A' }}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm" style={{ color: '#B8001F' }}>{errors.service.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
            {locale === 'ar' ? 'وصف المشروع' : 'Project Description'} *
          </label>
          <div className="relative">
            <MessageSquare className={`absolute top-3 w-5 h-5 ${locale === 'ar' ? 'right-4' : 'left-4'}`} style={{ color: '#B8001F' }} />
            <textarea
              {...register('message')}
              rows={4}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 border-white/20 text-white placeholder-white/50 ${
                errors.message ? 'border-red-500' : ''
              } ${locale === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              placeholder={locale === 'ar' 
                ? 'أخبرنا عن مشروعك وما تريد تحقيقه'
                : 'Tell us about your project and what you want to achieve'
              }
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm" style={{ color: '#B8001F' }}>{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
                          className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            background: 'linear-gradient(135deg, #B8001F 0%, #8B0000 100%)',
            color: '#FFFFFF'
          }}
        >
          {isSubmitting 
            ? (locale === 'ar' ? 'جاري الإرسال...' : 'Sending...')
            : (locale === 'ar' ? 'طلب تجربة مجانية' : 'Request Free Trial')
          }
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 border rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: '#22C55E' }}>
            <p className="text-center" style={{ color: '#22C55E' }}>
              {locale === 'ar' 
                ? 'تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة.'
                : 'Your request has been sent successfully! We\'ll contact you within 24 hours.'
              }
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 border rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }}>
            <p className="text-center" style={{ color: '#EF4444' }}>
              {locale === 'ar' 
                ? 'حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.'
                : 'An error occurred while sending your request. Please try again.'
              }
            </p>
          </div>
        )}
      </form>

      {/* Benefits */}
      <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <h4 className="font-semibold mb-3" style={{ color: '#FFFFFF' }}>
          {locale === 'ar' ? 'مزايا التجربة المجانية:' : 'Free Trial Benefits:'}
        </h4>
        <ul className="space-y-2 text-sm" style={{ color: '#B3B3D2' }} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#B8001F' }}></span>
            {locale === 'ar' ? '7 أيام تجربة مجانية' : '7 days free trial'}
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#B8001F' }}></span>
            {locale === 'ar' ? 'دعم فني مجاني' : 'Free technical support'}
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#B8001F' }}></span>
            {locale === 'ar' ? 'لا توجد التزامات' : 'No commitments'}
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#B8001F' }}></span>
            {locale === 'ar' ? 'إلغاء في أي وقت' : 'Cancel anytime'}
          </li>
        </ul>
      </div>
    </div>
  );
} 