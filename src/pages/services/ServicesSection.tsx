'use client'

import { useRef, useEffect, useState } from 'react'
import {
  Megaphone,
  Palette,
  Code,
  Target,
  Search,
  TrendingUp,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '../../components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useViewAnimation, fadeInUp, staggerContainer, scaleIn, fadeInLeft, fadeInRight } from '@/hooks/useViewAnimation'

const ServicesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Use the same language context as the rest of the app
  const { locale, isRTL } = useLanguage()
  const isArabic = locale === 'ar'
  

  
  

  // View animations
  const { ref: sectionRef, controls: sectionControls } = useViewAnimation({ threshold: 0.1 })
  const { ref: headerRef, controls: headerControls } = useViewAnimation({ threshold: 0.3 })
  const { ref: servicesRef, controls: servicesControls } = useViewAnimation({ threshold: 0.2 })
  const { ref: ctaRef, controls: ctaControls } = useViewAnimation({ threshold: 0.3 })

  const services = [
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: isArabic ? "التسويق الرقمي" : "Digital Marketing",
      description: isArabic 
        ? "استراتيجيات تسويق رقمي شاملة تجذب الزوار وتولد العملاء المحتملين وتزيد التحويلات عبر جميع القنوات الرقمية."
        : "Comprehensive digital marketing strategies to boost your online presence and drive engagement.",
      features: isArabic 
        ? ["إدارة وسائل التواصل الاجتماعي", "إعلانات جوجل وفيسبوك", "حملات التسويق عبر البريد الإلكتروني", "شراكات المؤثرين"]
        : ["Social Media Marketing", "Content Marketing", "Email Campaigns", "Influencer Marketing"],
      price: isArabic ? "يبدأ من ٢٥٠٠ جنيه" : "Starting from $1,500",
      image: "https://picsum.photos/400/300?random=1",
      popular: false
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: isArabic ? "العلامة التجارية والتصميم" : "Branding & Design",
      description: isArabic 
        ? "إنشاء هويات علامة تجارية لا تُنسى تتردد صداها مع جمهورك المستهدف وتبرز في السوق المصري التنافسي."
        : "Create a powerful brand identity that resonates with your target audience and stands out.",
      features: isArabic 
        ? ["تصميم الشعار وهوية العلامة التجارية", "المواد التسويقية", "تصميم العبوات", "إرشادات العلامة التجارية"]
        : ["Logo Design", "Brand Identity", "Graphic Design", "Print Materials"],
      price: isArabic ? "يبدأ من ٣٠٠٠ جنيه" : "Starting from $2,500",
      image: "https://picsum.photos/400/300?random=2",
      popular: true
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: isArabic ? "تطوير المواقع" : "Web Development",
      description: isArabic 
        ? "مواقع ويب حديثة ومتجاوبة تحول الزوار إلى عملاء. من صفحات الهبوط البسيطة إلى منصات التجارة الإلكترونية المعقدة."
        : "Modern, responsive websites and applications built for performance and user experience.",
      features: isArabic 
        ? ["تصميم مواقع متجاوبة", "تطوير التجارة الإلكترونية", "تحسين محركات البحث", "تحسين الأداء"]
        : ["Custom Websites", "E-commerce Solutions", "Mobile Apps", "SEO Optimization"],
      price: isArabic ? "يبدأ من ٥٠٠٠ جنيه" : "Starting from $3,500",
      image: "https://picsum.photos/400/300?random=3",
      popular: false
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: isArabic ? "الإعلانات المدفوعة" : "Advertising",
      description: isArabic 
        ? "حملات إعلانية مدفوعة استراتيجية تعظم العائد على الاستثمار وتصل إلى عملائك المثاليين عبر جوجل وفيسبوك وإنستغرام."
        : "Strategic advertising campaigns across multiple platforms to maximize your ROI.",
      features: isArabic 
        ? ["إدارة إعلانات جوجل", "إعلانات فيسبوك وإنستغرام", "إعلانات يوتيوب", "تحسين الحملات"]
        : ["Google Ads", "Facebook Advertising", "Instagram Campaigns", "YouTube Marketing"],
      price: isArabic ? "يبدأ من ٢٠٠٠ جنيه" : "Starting from $2,000",
      image: "https://picsum.photos/400/300?random=4",
      popular: false
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: isArabic ? "خدمات تحسين محركات البحث" : "SEO Services",
      description: isArabic 
        ? "تحسين ترتيب موقعك في محركات البحث وجذب زيارات عضوية لموقعك الإلكتروني."
        : "Improve your search engine rankings and drive organic traffic to your website.",
      features: isArabic 
        ? ["تحسين تقني لمحركات البحث", "تحسين الصفحات", "بناء الروابط", "تحسين محلي"]
        : ["Technical SEO", "On-Page Optimization", "Link Building", "Local SEO"],
      price: isArabic ? "يبدأ من ١٨٠٠ جنيه" : "Starting from $1,800",
      image: "https://picsum.photos/400/300?random=5",
      popular: false
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: isArabic ? "استشارات المبيعات" : "Sales Consulting",
      description: isArabic 
        ? "تحسين عمليات المبيعات وزيادة الإيرادات باستراتيجيات مدفوعة بالبيانات."
        : "Optimize your sales processes and increase revenue with data-driven strategies.",
      features: isArabic 
        ? ["استراتيجية المبيعات", "تنفيذ إدارة علاقات العملاء", "تدريب المبيعات", "تحليلات الأداء"]
        : ["Sales Strategy", "CRM Implementation", "Sales Training", "Performance Analytics"],
      price: isArabic ? "يبدأ من ٢٢٠٠ جنيه" : "Starting from $2,200",
      image: "https://picsum.photos/400/300?random=6",
      popular: false
    }
  ]

  // Duplicate services for infinite scroll
  const duplicatedServices = [...services, ...services, ...services]

      // Simple and aggressive auto-scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

              // Force start after a short delay
     const startScroll = () => {
       const isArabicPage = window.location.pathname.includes('/ar')
       
                               let scrollPosition = 0
        const scrollSpeed = 2 // Slow speed
        let lastTime = 0
        const frameDelay = 0 // Only update every 50ms (20fps instead of 60fps)
       
                 const scroll = (currentTime: number) => {
           if (currentTime - lastTime < frameDelay) {
             requestAnimationFrame(scroll)
             return
           }
           lastTime = currentTime
           
           const currentSpeed = scrollSpeed
          
          if (isArabicPage) {
            scrollPosition -= currentSpeed
            container.scrollLeft = Math.abs(scrollPosition)
          } else {
            scrollPosition += currentSpeed
            container.scrollLeft = scrollPosition
          }
          
          // Reset for infinite effect
          const maxScroll = container.scrollWidth - container.clientWidth
          if (scrollPosition > maxScroll) {
            scrollPosition = 0
          } else if (scrollPosition < -maxScroll) {
            scrollPosition = 0
          }
          
          requestAnimationFrame(scroll)
        }
      
        requestAnimationFrame(scroll)
     }

                // Start immediately
      setTimeout(startScroll, 500)
    }, [])



  return (
    <section id="services" className="section-padding bg-brand-black px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <motion.div 
        className="container-custom"
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
              {isArabic ? 'خدماتنا' : 'Our Services'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-brand-white leading-tight">
            {isArabic ? 'حلول تسويقية' : 'Marketing Solutions'}{' '}
            <span className="text-red-500">{isArabic ? 'شاملة' : 'That Drive Results'}</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-100 max-w-3xl mx-auto leading-relaxed px-4">
            {isArabic 
              ? "من الاستراتيجية إلى التنفيذ، نقدم خدمات تسويقية شاملة مصممة لمساعدة عملك على الازدهار في المشهد الرقمي."
              : "From strategy to execution, we provide end-to-end marketing services tailored to help your business thrive in the digital landscape."
            }
          </p>
        </motion.div>

                 {/* Services Container with Scroll and Fade Gradients */}
         <motion.div 
           className="relative"
           ref={servicesRef}
           variants={fadeInUp}
           initial="hidden"
           animate={servicesControls}
           style={{ overflow: 'visible !important' }} // Ensure parent doesn't clip
         >
          {/* Left Fade Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
          
          {/* Right Fade Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>

                     {/* Services Scroll Container */}
                       <motion.div
              ref={scrollContainerRef}
              className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-1 py-6 sm:py-8 ltr"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                overflow: 'auto !important' // Force override any global overflow hidden
              }}
              variants={staggerContainer}
            >
            {duplicatedServices.map((service, index) => (
              <motion.div
                key={index}
                className={`relative bg-brand-dark-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 flex-shrink-0 flex flex-col hover:scale-105 ${
                  service.popular
                    ? 'border-yellow-400 shadow-lg shadow-yellow-500/20 bg-gradient-to-br from-yellow-400/10 via-yellow-500/5 to-yellow-600/10'
                    : 'border-brand-dark-300 hover:border-yellow-400/50 hover:bg-gradient-to-br hover:from-yellow-400/5 hover:via-yellow-500/3 hover:to-yellow-600/5'
                }`}
                                 style={{ 
                   width: '320px', // Increased width for better visibility
                   minWidth: '320px',
                   maxWidth: '320px',
                   height: '520px'
                 }}
                variants={fadeInUp}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <motion.div 
                    className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-brand-black text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm shadow-yellow-500/25">
                      {isArabic ? "الأكثر شعبية" : "Most Popular"}
                    </span>
                  </motion.div>
                )}

                {/* Service Image */}
                <div className="mb-3 sm:mb-4 w-full h-40 sm:h-56 lg:h-64 bg-brand-dark-200 rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Service Content with Icon next to Title */}
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-500 flex-shrink-0">
                      <div className="w-4 h-4 sm:w-5 sm:h-5">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-brand-gray-100 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 flex-1">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-brand-gray-100 text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="mb-3 sm:mb-4">
                  <span className="text-brand-white font-bold text-base sm:text-lg">{service.price}</span>
                </div>

                {/* CTA Button */}
                <motion.button 
                  className="w-full bg-brand-dark-200 hover:bg-red-600 text-brand-white font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 mt-auto group cursor-pointer"
                >
                  <span className="text-brand-white group-hover:!text-red-500 transition-colors duration-300 text-sm sm:text-base">{isArabic ? "ابدأ الآن" : "Get Started"}</span>
                  {isArabic ? (
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-[-1] rotate-180 group-hover:text-red-500" />
                  ) : (
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-red-500" />
                  )}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          ref={ctaRef}
          variants={fadeInUp}
          initial="hidden"
          animate={ctaControls}
        >
          <motion.p 
            className="text-sm sm:text-base text-brand-gray-100 mb-4 sm:mb-6 px-4"
            variants={fadeInUp}
          >
            {isArabic 
              ? "تحتاج حل مخصص؟ دعنا نناقش متطلباتك المحددة."
              : "Need a custom solution? Let&apos;s discuss your specific requirements."
            }
          </motion.p>
          <motion.div
            variants={scaleIn}
          >
            <Button
              variant="animated"
              size="lg"
              onClick={() => console.log('Schedule a Consultation clicked!')}
              className="hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              {isArabic ? "جدولة استشارة" : "Schedule a Consultation"}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ServicesSection 