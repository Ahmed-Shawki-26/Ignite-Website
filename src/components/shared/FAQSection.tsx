'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Send, Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import Button from '../ui/Button'

interface FAQSectionProps {
  locale: 'en' | 'ar';
}

const FAQSection = ({ locale }: FAQSectionProps) => {
  const isArabic = locale === 'ar'

  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    question: ''
  })

  const faqs = [
    {
      question: isArabic 
        ? "كم من الوقت يستغرق إكمال مشروع تطوير المواقع؟"
        : "How long does it take to complete a web development project?",
      answer: isArabic 
        ? "تختلف الجداول الزمنية للمشاريع حسب التعقيد والمتطلبات. يستغرق الموقع البسيط عادة 2-4 أسابيع، بينما قد تستغرق تطبيقات التجارة الإلكترونية المعقدة أو التطبيقات المخصصة 8-12 أسبوعاً. نقدم جداول زمنية مفصلة خلال استشارتنا الأولية ونبقيك محدثاً طوال العملية."
        : "Project timelines vary depending on complexity and requirements. A simple website typically takes 2-4 weeks, while complex e-commerce or custom applications can take 8-12 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process."
    },
    {
      question: isArabic 
        ? "هل يمكنكم التعامل مع مشاريع تطوير تطبيقات الهاتف المحمول واسعة النطاق؟"
        : "Can you handle large-scale mobile app development projects?",
      answer: isArabic 
        ? "بالتأكيد! يتضمن فريقنا مطوري تطبيقات الهاتف المحمول ذوي الخبرة الذين يمكنهم التعامل مع مشاريع بأي حجم. نطور تطبيقات iOS و Android الأصلية، بالإضافة إلى حلول عبر المنصات باستخدام React Native و Flutter، مما يضمن الأداء الأمثل وتجربة المستخدم."
        : "Absolutely! Our collective includes experienced mobile app developers who can handle projects of any scale. We develop native iOS and Android apps, as well as cross-platform solutions using React Native and Flutter, ensuring optimal performance and user experience."
    },
    {
      question: isArabic 
        ? "هل يمكنكم دمج واجهات برمجة التطبيقات الخارجية في تطبيق الهاتف المحمول الخاص بنا؟"
        : "Can you integrate third-party APIs into our mobile app?",
      answer: isArabic 
        ? "نعم، لدينا خبرة واسعة في دمج واجهات برمجة التطبيقات الخارجية المختلفة بما في ذلك بوابات الدفع ومنصات وسائل التواصل الاجتماعي وخدمات الخرائط وأدوات التحليلات وأنظمة الأعمال المخصصة. نضمن التكامل السلس مع الحفاظ على معايير الأمان والأداء."
        : "Yes, we have extensive experience integrating various third-party APIs including payment gateways, social media platforms, mapping services, analytics tools, and custom business systems. We ensure seamless integration while maintaining security and performance standards."
    },
    {
      question: isArabic 
        ? "كيف تضمنون التوافق عبر المنصات لتطبيقات الهاتف المحمول؟"
        : "How do you ensure cross-platform compatibility for mobile apps?",
      answer: isArabic 
        ? "نتبع أفضل الممارسات في الصناعة للتطوير عبر المنصات، وإجراء اختبارات شاملة على أجهزة وأنظمة تشغيل متعددة. يستخدم فريقنا مبادئ التصميم المتجاوب والتحسينات الخاصة بالمنصة لضمان الأداء المتسق عبر أجهزة iOS و Android."
        : "We follow industry best practices for cross-platform development, conducting thorough testing on multiple devices and operating system versions. Our team uses responsive design principles and platform-specific optimizations to ensure consistent performance across iOS and Android devices."
    },
    {
      question: isArabic 
        ? "ما هو نهجكم في تصميم تجربة المستخدم (UX)؟"
        : "What is your approach to user experience (UX) design?",
      answer: isArabic 
        ? "نهجنا في تصميم تجربة المستخدم يركز على المستخدم ويقوم على البيانات. نجري أبحاث المستخدم، وننشئ شخصيات، ونطور الإطارات السلكية والنماذج الأولية، ونقوم باختبارات سهولة الاستخدام. نركز على إنشاء واجهات بديهية توفر تجارب مستخدم ممتازة مع تحقيق الأهداف التجارية."
        : "Our UX design approach is user-centered and data-driven. We conduct user research, create personas, develop wireframes and prototypes, and perform usability testing. We focus on creating intuitive interfaces that provide excellent user experiences while meeting business objectives."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', phone: '', question: '' })
  }

  return (
    <section className="relative overflow-hidden w-full" style={{ paddingTop: '0', paddingBottom: '6rem' }}>
      {/* Seamless background continuation - no boundaries */}
      <div className="absolute inset-0 w-full" style={{ 
        background: 'linear-gradient(180deg, transparent 0%, rgba(26, 26, 26, 0.3) 20%, rgba(38, 38, 38, 0.6) 50%, rgba(0, 0, 0, 0.8) 80%, #000000 100%)',
        top: '-2rem'
      }}></div>
      
      {/* Additional smooth overlay for gradual transition */}
      <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-transparent to-black/50" style={{ top: '-2rem' }}></div>
      
      {/* Extended animated background elements - continuing the contact page theme */}
      <div className="absolute rounded-full animate-pulse" style={{ 
        top: '5%', 
        left: isArabic ? '10%' : '85%', 
        width: '20rem', 
        height: '20rem', 
        backgroundColor: '#B8001F', 
        opacity: 0.06, 
        filter: 'blur(4rem)',
        animationDelay: '0.5s'
      }}></div>
      
      <div className="absolute rounded-full animate-pulse" style={{ 
        top: '40%', 
        right: isArabic ? '85%' : '5%', 
        width: '16rem', 
        height: '16rem', 
        backgroundColor: '#CE8D63', 
        opacity: 0.04, 
        filter: 'blur(3rem)',
        animationDelay: '1.5s'
      }}></div>
      
      <div className="absolute rounded-full animate-pulse" style={{ 
        bottom: '15%', 
        left: isArabic ? '75%' : '15%', 
        width: '22rem', 
        height: '22rem', 
        backgroundColor: '#B8001F', 
        opacity: 0.03, 
        filter: 'blur(5rem)',
        animationDelay: '2.5s'
      }}></div>
      
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10" style={{ paddingTop: '4rem' }}>
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in-up">
          <div className="inline-block">
            <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">
              {isArabic ? 'الأسئلة الشائعة' : "FAQ's"}
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-white leading-tight">
            {isArabic ? 'الأسئلة' : 'Frequently Asked'}{' '}
            <span className="text-brand-red">{isArabic ? 'الشائعة' : 'Questions'}</span>
          </h2>
          <p className="text-lg text-brand-gray-100 max-w-3xl mx-auto leading-relaxed">
            {isArabic 
              ? 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا وعملياتنا وكيف يمكننا مساعدتك في تحويل حضورك الرقمي.'
              : "Find answers to common questions about our services, processes, and how we can help transform your digital presence."
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* FAQ List */}
          <div className="space-y-4 animate-slide-in-left">

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-brand-dark-200 rounded-lg border border-brand-dark-300 overflow-hidden transition-all duration-300 hover:border-red-500/50"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full px-6 py-4 flex items-center justify-between hover:bg-brand-dark-300/50 transition-colors duration-300 cursor-pointer ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <span className={`text-brand-white font-semibold ${isArabic ? 'pl-4' : 'pr-4'}`}>
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 text-red-500">
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {openFAQ === index && (
                  <div className="px-6 pb-4 border-t border-brand-dark-300">
                    <p className={`text-brand-gray-100 leading-relaxed pt-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <div className="bg-brand-dark-200 rounded-2xl p-8 border border-brand-dark-300" dir={isArabic ? 'rtl' : 'ltr'}>
              <h3 className={`text-2xl font-bold text-brand-white mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'اسأل سؤالك' : 'Ask Your Question'}
              </h3>
              <p className={`text-brand-gray-100 mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic 
                  ? 'لا تجد الإجابة التي تبحث عنها؟ أرسل لنا سؤالك وسنرد عليك خلال 24 ساعة.'
                  : "Can't find the answer you're looking for? Send us your question and we'll get back to you within 24 hours."
                }
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block text-brand-white font-medium mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'الاسم' : 'Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-brand-dark-300 border border-brand-dark-400 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder={isArabic ? 'اسمك' : 'Your name'}
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-brand-white font-medium mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-brand-dark-300 border border-brand-dark-400 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-red-500 transition-colors duration-300"
                      placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'}
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={`block text-brand-white font-medium mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-brand-dark-300 border border-brand-dark-400 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-brand-orange-100 transition-colors duration-300"
                    placeholder={isArabic ? 'رقم هاتفك' : 'Your phone number'}
                    dir={isArabic ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label htmlFor="question" className={`block text-brand-white font-medium mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {isArabic ? 'سؤالك' : 'Your Question'}
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-brand-dark-300 border border-brand-dark-400 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none"
                    placeholder={isArabic ? 'أخبرنا عن مشروعك أو اطرح سؤالك...' : 'Tell us about your project or ask your question...'}
                    dir={isArabic ? 'rtl' : 'ltr'}
                  />
                </div>

                <Button
                  type="submit"
                  variant="animated"
                  size="lg"
                  customIcon="/icons/send.svg"
                  iconPosition={isArabic ? "left" : "right"}
                  className="w-full"
                >
                  {isArabic ? 'إرسال سؤالك' : 'Send Your Question'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/*Contact Information */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              {isArabic ? 'معلومات التواصل' : 'Contact Information'}
            </h3>
            <p className="text-lg max-w-2xl mx-auto py-10" style={{ color: '#B3B3D2' }}>
              {isArabic 
                ? 'نحن هنا لمساعدتك. اختر الطريقة التي تفضلها للتواصل معنا.'
                : 'We\'re here to help. Choose your preferred way to get in touch with us.'
              }
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
              <div className="flex items-center mb-4">
                <div className={`bg-red-500/20 p-3 rounded-full ${isArabic ? 'ml-4' : 'mr-4'}`}>
                  <Mail className="w-6 h-6" style={{ color: '#B8001F' }} />
                </div>
                <h4 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                  {isArabic ? 'البريد الإلكتروني' : 'Email'}
                </h4>
              </div>
              <p className="text-sm mb-2" style={{ color: '#B3B3D2' }}>
                {isArabic ? 'للاستفسارات العامة' : 'For general inquiries'}
              </p>
              <a href="mailto:info@igniteteam.com" className="font-medium transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block" style={{ color: '#B8001F' }}>
                info@igniteteam.com
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
              <div className="flex items-center mb-4">
                <div className={`bg-red-500/20 p-3 rounded-full ${isArabic ? 'ml-4' : 'mr-4'}`}>
                  <MessageCircle className="w-6 h-6" style={{ color: '#B8001F' }} />
                </div>
                <h4 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                  {isArabic ? 'المشاريع الجديدة' : 'New Projects'}
                </h4>
              </div>
              <p className="text-sm mb-2" style={{ color: '#B3B3D2' }}>
                {isArabic ? 'للمشاريع الجديدة' : 'For new projects'}
              </p>
              <a href="mailto:projects@igniteteam.com" className="font-medium transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block" style={{ color: '#B8001F' }}>
                projects@igniteteam.com
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
              <div className="flex items-center mb-4">
                <div className={`bg-red-500/20 p-3 rounded-full ${isArabic ? 'ml-4' : 'mr-4'}`}>
                  <Phone className="w-6 h-6" style={{ color: '#B8001F' }} />
                </div>
                <h4 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                  {isArabic ? 'الهاتف' : 'Phone'}
                </h4>
              </div>
              <p className="text-sm mb-2" style={{ color: '#B3B3D2' }}>
                {isArabic ? 'اتصل بنا مباشرة' : 'Call us directly'}
              </p>
              <a href="tel:+201234567890" className="font-medium transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block" style={{ color: '#B8001F' }} dir="ltr">
                +20 123 456 7890
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
              <div className="flex items-center mb-4">
                <div className={`bg-red-500/20 p-3 rounded-full ${isArabic ? 'ml-4' : 'mr-4'}`}>
                  <MapPin className="w-6 h-6" style={{ color: '#B8001F' }} />
                </div>
                <h4 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                  {isArabic ? 'العنوان' : 'Address'}
                </h4>
              </div>
              <p className="text-sm mb-2" style={{ color: '#B3B3D2' }}>
                {isArabic ? 'مقرنا الرئيسي' : 'Our main office'}
              </p>
              <span className="font-medium" style={{ color: '#B8001F' }}>
                {isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt'}
              </span>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-2xl p-8 border border-red-500/20" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="flex items-start mb-6">
              <div className={`bg-red-500/20 p-3 rounded-full ${isArabic ? 'ml-4' : 'mr-4'} flex-shrink-0`}>
                <Clock className="w-6 h-6" style={{ color: '#B8001F' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#FFFFFF' }}>
                  {isArabic ? 'ساعات العمل' : 'Business Hours'}
                </h3>
                <p style={{ color: '#B3B3D2' }}>
                  {isArabic ? 'متى يمكنك الوصول إلينا' : 'When you can reach us'}
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>
                  {isArabic ? 'أيام العمل' : 'Weekdays'}
                </h4>
                <p style={{ color: '#B3B3D2' }}>
                  {isArabic ? 'الأحد - الخميس' : 'Sunday - Thursday'}
                </p>
                <p style={{ color: '#B3B3D2' }}>
                  {isArabic ? '9:00 ص - 6:00 م' : '9:00 AM - 6:00 PM'}
                </p>
                <p style={{ color: '#B3B3D2' }}>
                  {isArabic 
                    ? 'نرد على جميع الرسائل خلال 24 ساعة'
                    : 'We respond to all messages within 24 hours'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>
                  {isArabic ? 'عطلة نهاية الأسبوع' : 'Weekends'}
                </h4>
                <p style={{ color: '#B3B3D2' }}>
                  {isArabic ? 'الجمعة - السبت' : 'Friday - Saturday'}
                </p>
                <p style={{ color: '#B3B3D2' }}>
                  {isArabic ? 'مغلق' : 'Closed'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection 