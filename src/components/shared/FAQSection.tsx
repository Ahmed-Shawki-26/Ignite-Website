'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { useViewAnimation, fadeInUp, staggerContainer, scaleIn, fadeInLeft, fadeInRight } from '@/hooks/useViewAnimation'

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

  // View animations
  const { ref: sectionRef, controls: sectionControls } = useViewAnimation({ threshold: 0.1 })
  const { ref: headerRef, controls: headerControls } = useViewAnimation({ threshold: 0.3 })
  const { ref: faqRef, controls: faqControls } = useViewAnimation({ threshold: 0.2 })
  const { ref: formRef, controls: formControls } = useViewAnimation({ threshold: 0.2 })

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
    <section className="relative overflow-hidden w-full px-4 sm:px-6 lg:px-8" style={{ paddingTop: '0', paddingBottom: '6rem' }} ref={sectionRef}>
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
      
      <motion.div 
        className="max-w-7xl mx-auto w-full relative z-10" 
        style={{ paddingTop: '4rem' }}
        variants={staggerContainer}
        initial="hidden"
        animate={sectionControls}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16"
          ref={headerRef}
          variants={fadeInUp}
          initial="hidden"
          animate={headerControls}
        >
          <div className="inline-block">
            <span className="text-red-500 font-semibold uppercase tracking-wider text-xs sm:text-sm">
              {isArabic ? 'الأسئلة الشائعة' : "FAQ's"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-brand-white leading-tight">
            {isArabic ? 'الأسئلة' : 'Frequently Asked'}{' '}
            <span className="text-brand-red">{isArabic ? 'الشائعة' : 'Questions'}</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-100 max-w-3xl mx-auto leading-relaxed px-4">
            {isArabic 
              ? 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا وعملياتنا وكيف يمكننا مساعدتك في تحويل حضورك الرقمي.'
              : "Find answers to common questions about our services, processes, and how we can help transform your digital presence."
            }
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* FAQ List */}
          <motion.div 
            className="space-y-3 sm:space-y-4"
            ref={faqRef}
            variants={fadeInLeft}
            initial="hidden"
            animate={faqControls}
          >

            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-brand-dark-200 rounded-lg border border-brand-dark-300 overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:scale-105 cursor-pointer"
                dir={isArabic ? 'rtl' : 'ltr'}
                variants={fadeInUp}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-brand-dark-300/50 transition-colors duration-300 cursor-pointer ${
                    isArabic ? 'text-right' : 'text-left'
                  }`}
                >
                  <span className={`text-brand-white font-semibold text-sm sm:text-base ${isArabic ? 'pl-2 sm:pl-4' : 'pr-2 sm:pr-4'}`}>
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 text-red-500">
                    {openFAQ === index ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                </button>

                {openFAQ === index && (
                  <div className="px-4 sm:px-6 pb-4 border-t border-brand-dark-300">
                    <p className={`text-brand-gray-100 leading-relaxed pt-3 sm:pt-4 text-sm sm:text-base ${isArabic ? 'text-right' : 'text-left'}`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className=""
            ref={formRef}
            variants={fadeInRight}
            initial="hidden"
            animate={formControls}
          >
            <motion.div 
              className="bg-brand-dark-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-brand-dark-300" 
              dir={isArabic ? 'rtl' : 'ltr'}
              variants={fadeInUp}
            >
              <h3 className={`text-xl sm:text-2xl font-bold text-brand-white mb-4 sm:mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic ? 'اسأل سؤالك' : 'Ask Your Question'}
              </h3>
              <p className={`text-brand-gray-100 mb-6 sm:mb-8 text-sm sm:text-base ${isArabic ? 'text-right' : 'text-left'}`}>
                {isArabic 
                  ? 'لا تجد الإجابة التي تبحث عنها؟ أرسل لنا سؤالك وسنرد عليك خلال 24 ساعة.'
                  : "Can't find the answer you're looking for? Send us your question and we'll get back to you within 24 hours."
                }
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block text-brand-white font-medium mb-2 text-sm sm:text-base ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'الاسم' : 'Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-brand-dark-300 border border-brand-dark-400 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-red-500 transition-colors duration-300 text-sm sm:text-base"
                      placeholder={isArabic ? 'اسمك' : 'Your name'}
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-brand-white font-medium mb-2 text-sm sm:text-base ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-brand-dark-300 border border-brand-dark-400 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-red-500 transition-colors duration-300 text-sm sm:text-base"
                      placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'}
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={`block text-brand-white font-medium mb-2 text-sm sm:text-base ${isArabic ? 'text-right' : 'text-left'}`}>
                    {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-brand-dark-300 border border-brand-dark-400 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-brand-orange-100 transition-colors duration-300 text-sm sm:text-base"
                    placeholder={isArabic ? 'رقم هاتفك' : 'Your phone number'}
                    dir={isArabic ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label htmlFor="question" className={`block text-brand-white font-medium mb-2 text-sm sm:text-base ${isArabic ? 'text-right' : 'text-left'}`}>
                    {isArabic ? 'سؤالك' : 'Your Question'}
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-brand-dark-300 border border-brand-dark-400 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none text-sm sm:text-base"
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
                  className="w-full text-sm sm:text-base"
                >
                  {isArabic ? 'إرسال سؤالك' : 'Send Your Question'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>


      </motion.div>
    </section>
  )
}

export default FAQSection 