'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Megaphone,
  Palette,
  Code,
  Target,
  Search,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Button from '../../components/ui/Button'

const ServicesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(true)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  
  // Get locale from URL path
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const isArabic = locale === 'ar'

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
      image: "/images/services/digital-marketing.jpg",
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
      image: "/images/services/branding-design.jpg",
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
      image: "/images/services/web-development.jpg",
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
      image: "/images/services/advertising.jpg",
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
      image: "/images/services/seo-services.jpg",
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
      image: "/images/services/sales-consulting.jpg",
      popular: false
    }
  ]

  // Duplicate services for infinite scroll
  const duplicatedServices = [...services, ...services, ...services]

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = 280 // Card width
      const gap = 12 // Gap between cards (gap-3 = 12px)
      const scrollAmount = cardWidth + gap
      
      // For RTL, reverse the scroll direction
      if (isArabic) {
        if (direction === 'left') {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        } else {
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        }
      } else {
        if (direction === 'left') {
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      }
    }
  }

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const maxScroll = container.scrollWidth - container.clientWidth
      const currentScroll = container.scrollLeft
      
      // Reset position for infinite scroll
      if (currentScroll >= maxScroll * 0.66) {
        container.scrollTo({ left: maxScroll * 0.33, behavior: 'auto' })
      } else if (currentScroll <= maxScroll * 0.05) {
        container.scrollTo({ left: maxScroll * 0.33, behavior: 'auto' })
      }
    }
  }

  // Auto scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const cardWidth = 280
        const gap = 12
        const scrollAmount = cardWidth + gap
        
        // For RTL, scroll in the opposite direction
        if (isArabic) {
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      }
    }, 3000) // Scroll every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling, isArabic])

  // Handle scroll position reset for infinite scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const handleScroll = () => {
        checkScrollPosition()
      }
      
      container.addEventListener('scroll', handleScroll)
      
      // Set initial position to middle section
      setTimeout(() => {
        const maxScroll = container.scrollWidth - container.clientWidth
        container.scrollTo({ left: maxScroll * 0.33, behavior: 'auto' })
      }, 100)
      
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="services" className="section-padding bg-brand-black">
      <div className="w-[90%] mx-auto">
                 {/* Section Header */}
         <div className="text-center space-y-6 mb-16 animate-fade-in-up">
           <div className="inline-block">
                         <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">
              {isArabic ? "خدماتنا" : "Our Services"}
            </span>
           </div>
           <h2 className="text-3xl lg:text-5xl font-bold text-brand-white leading-tight">
             {isArabic ? "حلول تسويقية" : "Comprehensive Marketing"}{' '}
             <span className="text-brand-red">{isArabic ? "شاملة" : "Solutions"}</span>
           </h2>
           <p className="text-lg text-brand-gray-100 max-w-3xl mx-auto leading-relaxed">
             {isArabic 
               ? "من الاستراتيجية إلى التنفيذ، نقدم خدمات تسويقية شاملة مصممة لمساعدة عملك على الازدهار في المشهد الرقمي."
               : "From strategy to execution, we provide end-to-end marketing services tailored to help your business thrive in the digital landscape."
             }
           </p>
         </div>

                 {/* Scroll Navigation */}
         <div className="flex justify-center items-center gap-8 mb-8">
                      <button
              onClick={() => {
                setIsAutoScrolling(false)
                scroll('right')
              }}
              className="w-12 h-12 bg-brand-dark-100 border border-brand-dark-300 rounded-full flex items-center justify-center text-brand-white hover:bg-red-600 hover:text-brand-white hover:scale-110 hover:shadow-sm hover:shadow-red-500/25 transition-all duration-300 cursor-pointer"
            >
             {isArabic ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
           </button>
           
                      <button
              onClick={() => {
                setIsAutoScrolling(false)
                scroll('left')
              }}
              className="w-12 h-12 bg-brand-dark-100 border border-brand-dark-300 rounded-full flex items-center justify-center text-brand-white hover:bg-red-600 hover:text-brand-white hover:scale-110 hover:shadow-sm hover:shadow-red-500/25 transition-all duration-300 cursor-pointer"
            >
             {isArabic ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
           </button>
         </div>

        {/* Services Container with Scroll and Fade Gradients */}
        <div className="relative">
          {/* Left Fade Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
          
          {/* Right Fade Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>

          {/* Services Scroll Container */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-1 py-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {duplicatedServices.map((service, index) => (
              <div
                key={index}
                                 className={`relative bg-brand-dark-100 rounded-2xl p-6 border transition-all duration-300 hover:transform hover:scale-105 flex-shrink-0 flex flex-col ${
                   service.popular
                     ? 'border-yellow-400 shadow-lg shadow-yellow-500/20 bg-gradient-to-br from-yellow-400/10 via-yellow-500/5 to-yellow-600/10'
                     : 'border-brand-dark-300 hover:border-yellow-400/50 hover:bg-gradient-to-br hover:from-yellow-400/5 hover:via-yellow-500/3 hover:to-yellow-600/5'
                 } animate-fade-in-up`}
                style={{ 
                  animationDelay: `${(index % services.length) * 150}ms`,
                  width: 'calc((90vw - 4 * 12px) / 5)', // Exactly 5 cards fit
                  minWidth: '280px',
                  height: '450px'
                }}
              >
                                 {/* Popular Badge */}
                 {service.popular && (
                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                                                       <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-brand-black text-xs font-bold px-4 py-2 rounded-full shadow-sm shadow-yellow-500/25">
                        {isArabic ? "الأكثر شعبية" : "Most Popular"}
                      </span>
                   </div>
                 )}

                {/* Service Image */}
                <div className="mb-4 w-full h-32 bg-brand-dark-200 rounded-lg overflow-hidden">
                                     <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                     <div className="text-red-500 opacity-50">
                       {service.icon}
                     </div>
                   </div>
                </div>

                {/* Service Content with Icon next to Title */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                                         <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-500 flex-shrink-0">
                       {service.icon}
                     </div>
                    <h3 className="text-lg font-bold text-brand-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-brand-gray-100 text-sm leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 mb-4 flex-1">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-brand-gray-100 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-brand-white font-bold text-lg">{service.price}</span>
                </div>

                                 {/* CTA Button */}
                                   <button className="w-full bg-brand-dark-200 hover:bg-red-600 text-brand-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-red-500/25 mt-auto group cursor-pointer">
                   <span className="text-brand-white group-hover:!text-red-500 transition-colors duration-300">{isArabic ? "ابدأ الآن" : "Get Started"}</span>
                   {isArabic ? (
                     <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[-1] rotate-180 group-hover:text-red-500" />
                   ) : (
                     <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-red-500" />
                   )}
                 </button>
              </div>
            ))}
          </div>
        </div>

                 {/* Bottom CTA */}
         <div className="text-center mt-16 animate-fade-in-up">
           <p className="text-brand-gray-100 mb-6">
             {isArabic 
               ? "تحتاج حل مخصص؟ دعنا نناقش متطلباتك المحددة."
               : "Need a custom solution? Let&apos;s discuss your specific requirements."
             }
           </p>
                       <Button
                         variant="animated"
                         size="lg"
                         onClick={() => console.log('Schedule a Consultation clicked!')}
                       >
                         {isArabic ? "جدولة استشارة" : "Schedule a Consultation"}
                       </Button>
         </div>
      </div>
    </section>
  )
}

export default ServicesSection 