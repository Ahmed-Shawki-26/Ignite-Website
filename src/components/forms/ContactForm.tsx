'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, User, Building, MessageSquare, DollarSign } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  locale: 'en' | 'ar';
}

export default function ContactForm({ locale }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const services = [
    { value: 'web-development', label: locale === 'ar' ? 'تطوير المواقع' : 'Web Development' },
    { value: 'digital-marketing', label: locale === 'ar' ? 'التسويق الرقمي' : 'Digital Marketing' },
    { value: 'branding', label: locale === 'ar' ? 'العلامة التجارية' : 'Branding' },
    { value: 'social-media', label: locale === 'ar' ? 'وسائل التواصل الاجتماعي' : 'Social Media' },
    { value: 'seo', label: locale === 'ar' ? 'تحسين محركات البحث' : 'SEO' },
    { value: 'consulting', label: locale === 'ar' ? 'الاستشارات' : 'Consulting' },
  ];

  const budgetRanges = [
    { value: 'under-5k', label: locale === 'ar' ? 'أقل من 5,000 جنيه' : 'Under $5,000' },
    { value: '5k-10k', label: locale === 'ar' ? '5,000 - 10,000 جنيه' : '$5,000 - $10,000' },
    { value: '10k-25k', label: locale === 'ar' ? '10,000 - 25,000 جنيه' : '$10,000 - $25,000' },
    { value: '25k-50k', label: locale === 'ar' ? '25,000 - 50,000 جنيه' : '$25,000 - $50,000' },
    { value: 'over-50k', label: locale === 'ar' ? 'أكثر من 50,000 جنيه' : 'Over $50,000' },
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: 'contact',
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

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
          {locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
        </label>
                  <div className="relative">
            <Phone className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 ${locale === 'ar' ? 'right-4' : 'left-4'}`} style={{ color: '#B8001F' }} />
            <input
              {...register('phone')}
              type="tel"
              className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 border-white/20 text-white placeholder-white/50 ${
                errors.phone ? 'border-red-500' : ''
              } ${locale === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              placeholder={locale === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
            />
          </div>
        {errors.phone && (
          <p className="mt-1 text-sm" style={{ color: '#B8001F' }}>{errors.phone.message}</p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
          {locale === 'ar' ? 'الشركة' : 'Company'} ({locale === 'ar' ? 'اختياري' : 'Optional'})
        </label>
                  <div className="relative">
            <Building className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 ${locale === 'ar' ? 'right-4' : 'left-4'}`} style={{ color: '#B8001F' }} />
            <input
              {...register('company')}
              type="text"
              className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 border-white/20 text-white placeholder-white/50 ${locale === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              placeholder={locale === 'ar' ? 'أدخل اسم شركتك' : 'Enter your company name'}
            />
          </div>
      </div>

      {/* Service Field */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
          {locale === 'ar' ? 'الخدمة المطلوبة' : 'Service Interest'} *
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

      {/* Budget Field */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
          {locale === 'ar' ? 'ميزانية المشروع' : 'Project Budget'} ({locale === 'ar' ? 'اختياري' : 'Optional'})
        </label>
        <select
          {...register('budget')}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className={`w-full py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/10 border-white/20 text-white appearance-none`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23B8001F' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: locale === 'ar' ? 'left 0.5rem center' : 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: locale === 'ar' ? '1rem' : '2.5rem',
            paddingLeft: locale === 'ar' ? '2.5rem' : '1rem'
          }}
        >
            <option value="" style={{ backgroundColor: '#1A1A1A' }}>{locale === 'ar' ? 'اختر الميزانية' : 'Select budget range'}</option>
            {budgetRanges.map((budget) => (
              <option key={budget.value} value={budget.value} style={{ backgroundColor: '#1A1A1A' }}>
                {budget.label}
              </option>
            ))}
          </select>
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#B3B3D2' }}>
          {locale === 'ar' ? 'الرسالة' : 'Message'} *
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
              placeholder={locale === 'ar' ? 'أخبرنا عن مشروعك' : 'Tell us about your project'}
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
        className="w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ 
          background: 'linear-gradient(135deg, #B8001F 0%, #8B0000 100%)',
          color: '#FFFFFF'
        }}
      >
        {isSubmitting 
          ? (locale === 'ar' ? 'جاري الإرسال...' : 'Sending...')
          : (locale === 'ar' ? 'إرسال الرسالة' : 'Send Message')
        }
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 border rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: '#22C55E' }}>
          <p className="text-center" style={{ color: '#22C55E' }}>
            {locale === 'ar' 
              ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
              : 'Your message has been sent successfully! We\'ll get back to you soon.'
            }
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 border rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }}>
          <p className="text-center" style={{ color: '#EF4444' }}>
            {locale === 'ar' 
              ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
              : 'An error occurred while sending your message. Please try again.'
            }
          </p>
        </div>
      )}
    </form>
  );
} 