import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

interface ContactInfoProps {
  locale: 'en' | 'ar';
}

export default function ContactInfo({ locale }: ContactInfoProps) {
  const contactData = {
    address: locale === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt',
    phone: '+20 123 456 7890',
    email: 'info@igniteteam.com',
    hours: locale === 'ar' ? 'الأحد - الخميس: 9:00 ص - 6:00 م' : 'Sunday - Thursday: 9:00 AM - 6:00 PM',
  };

  const contactMethods = [
    {
      icon: Mail,
      title: locale === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: 'info@igniteteam.com',
      description: locale === 'ar' ? 'للاستفسارات العامة' : 'For general inquiries',
      link: 'mailto:info@igniteteam.com',
    },
    {
      icon: MessageCircle,
      title: locale === 'ar' ? 'المشاريع الجديدة' : 'New Projects',
      value: 'projects@igniteteam.com',
      description: locale === 'ar' ? 'للمشاريع الجديدة' : 'For new projects',
      link: 'mailto:projects@igniteteam.com',
    },
    {
      icon: Phone,
      title: locale === 'ar' ? 'الهاتف' : 'Phone',
      value: '+20 123 456 7890',
      description: locale === 'ar' ? 'اتصل بنا مباشرة' : 'Call us directly',
      link: 'tel:+201234567890',
    },
    {
      icon: MapPin,
      title: locale === 'ar' ? 'العنوان' : 'Address',
      value: contactData.address,
      description: locale === 'ar' ? 'مقرنا الرئيسي' : 'Our main office',
      link: '#',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
          {locale === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#B3B3D2' }}>
          {locale === 'ar' 
            ? 'نحن هنا لمساعدتك. اختر الطريقة التي تفضلها للتواصل معنا.'
            : 'We\'re here to help. Choose your preferred way to get in touch with us.'
          }
        </p>
      </div>

      {/* Contact Methods Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className={`bg-red-500/20 p-3 rounded-full ${locale === 'ar' ? 'ml-4' : 'mr-4'}`}>
                <method.icon className="w-6 h-6" style={{ color: '#B8001F' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                {method.title}
              </h3>
            </div>
            <p className="text-sm mb-2" style={{ color: '#B3B3D2' }}>
              {method.description}
            </p>
            <a
              href={method.link}
              className="font-medium transition-colors duration-200"
              style={{ color: '#B8001F' }}
            >
              {method.value}
            </a>
          </div>
        ))}
      </div>

      {/* Business Hours */}
      <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-2xl p-8 border border-red-500/20">
        <div className="flex items-center mb-6">
          <div className={`bg-red-500/20 p-3 rounded-full ${locale === 'ar' ? 'ml-4' : 'mr-4'}`}>
            <Clock className="w-6 h-6" style={{ color: '#B8001F' }} />
          </div>
          <div>
            <h3 className="text-xl font-semibold" style={{ color: '#FFFFFF' }}>
              {locale === 'ar' ? 'ساعات العمل' : 'Business Hours'}
            </h3>
            <p style={{ color: '#B3B3D2' }}>
              {locale === 'ar' ? 'متى يمكنك الوصول إلينا' : 'When you can reach us'}
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3" style={{ color: '#FFFFFF' }}>
              {locale === 'ar' ? 'أيام العمل' : 'Weekdays'}
            </h4>
            <div className="space-y-1">
              <p style={{ color: '#B3B3D2' }}>
                {locale === 'ar' ? 'الأحد - الخميس' : 'Sunday - Thursday'}
              </p>
              <p style={{ color: '#B3B3D2' }}>
                {locale === 'ar' ? '9:00 ص - 6:00 م' : '9:00 AM - 6:00 PM'}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3" style={{ color: '#FFFFFF' }}>
              {locale === 'ar' ? 'عطلة نهاية الأسبوع' : 'Weekends'}
            </h4>
            <div className="space-y-1">
              <p style={{ color: '#B3B3D2' }}>
                {locale === 'ar' ? 'الجمعة - السبت' : 'Friday - Saturday'}
              </p>
              <p style={{ color: '#B3B3D2' }}>
                {locale === 'ar' ? 'مغلق' : 'Closed'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="mt-8 text-center">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-sm inline-block">
          <h4 className="text-lg font-semibold mb-2" style={{ color: '#FFFFFF' }}>
            {locale === 'ar' ? 'وقت الاستجابة' : 'Response Time'}
          </h4>
          <p style={{ color: '#B3B3D2' }}>
            {locale === 'ar' 
              ? 'نرد على جميع الرسائل خلال 24 ساعة'
              : 'We respond to all messages within 24 hours'
            }
          </p>
        </div>
      </div>
    </div>
  );
} 