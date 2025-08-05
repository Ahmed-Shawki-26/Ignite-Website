'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import { useViewAnimation, fadeInUp, staggerContainer, scaleIn } from '@/hooks/useViewAnimation'

const TestimonialsSection = () => {
  // Get locale from URL path
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const isArabic = locale === 'ar'

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // View animations
  const { ref: sectionRef, controls: sectionControls } = useViewAnimation({ threshold: 0.1 })
  const { ref: headerRef, controls: headerControls } = useViewAnimation({ threshold: 0.3 })
  const { ref: carouselRef, controls: carouselControls } = useViewAnimation({ threshold: 0.2 })
  const { ref: statsRef, controls: statsControls } = useViewAnimation({ threshold: 0.2 })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const testimonials = [
    {
      id: 1,
      name: "أحمد حسن",
      position: isArabic ? "الرئيس التنفيذي" : "CEO",
      company: "تيك فيجن مصر",
      image: "https://picsum.photos/100/100?random=10",
      rating: 5,
      text: isArabic 
        ? "حول فريق إغنايت للتسويق حضورنا الرقمي بالكامل. ساعدنا نهجهم الاستراتيجي وفهمهم العميق للسوق المصري على تحقيق نمو 300% في المبيعات عبر الإنترنت خلال 6 أشهر."
        : "Ignite Marketing transformed our digital presence completely. Their strategic approach and deep understanding of the Egyptian market helped us achieve 300% growth in online sales within 6 months."
    },
    {
      id: 2,
      name: "سارة محمد",
      position: isArabic ? "مديرة التسويق" : "Marketing Director",
      company: "دار الأزياء القاهرة",
      image: "https://picsum.photos/100/100?random=11",
      rating: 5,
      text: isArabic 
        ? "العمل مع فريق إغنايت كان رائعاً. ساعدنا إبداعهم في العلامة التجارية وحملات وسائل التواصل الاجتماعي على الوصول إلى شريحة أصغر سناً وزيادة الوعي بالعلامة التجارية بنسبة 250%."
        : "Working with the Ignite team has been incredible. Their creativity in branding and social media campaigns helped us reach a younger demographic and increase brand awareness by 250%."
    },
    {
      id: 3,
      name: "عمر فاروق",
      position: isArabic ? "مؤسس" : "Founder",
      company: "الشركات الناشئة الإسكندرية",
      image: "https://picsum.photos/100/100?random=12",
      rating: 5,
      text: isArabic 
        ? "النهج الجماعي لفريق إغنايت للتسويق رائع. كان لدينا إمكانية الوصول إلى متخصصين في كل مجال نحتاجه - من تطوير المواقع إلى الإعلانات الرقمية. النتائج تجاوزت توقعاتنا."
        : "The collective approach of Ignite Marketing is brilliant. We had access to specialists in every area we needed - from web development to digital advertising. Results exceeded our expectations."
    },
    {
      id: 4,
      name: "مريم علي",
      position: isArabic ? "مديرة العمليات" : "Operations Manager",
      company: "حلول الطاقة الخضراء",
      image: "https://picsum.photos/100/100?random=13",
      rating: 5,
      text: isArabic 
        ? "ساعدنا النهج القائم على البيانات لفريق إغنايت في التسويق الرقمي على تحسين حملاتنا وتحقيق عائد استثمار 400%. دعمهم المستمر وخبرتهم يجعلهم شريكاً لا يقدر بثمن."
        : "Ignite's data-driven approach to digital marketing helped us optimize our campaigns and achieve a 400% ROI. Their continuous support and expertise make them an invaluable partner."
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length, isClient])

  return (
    <section className="section-padding bg-brand-black px-4 sm:px-6 lg:px-8" ref={sectionRef}>
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
              {isArabic ? 'قصص نجاح العملاء' : 'Client Success Stories'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-brand-white leading-tight">
            {isArabic ? 'ماذا يقول' : 'What Our Clients'}{' '}
            <span className="text-red-500">{isArabic ? 'عملاؤنا' : 'Say'}</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-100 max-w-3xl mx-auto leading-relaxed px-4">
            {isArabic 
              ? 'لا تأخذ كلمتنا فقط. إليك ما يقوله عملاؤنا عن تجربتهم في العمل مع فريق التسويق الجماعي لدينا.'
              : "Don't just take our word for it. Here's what our clients have to say about their experience working with our marketing collective."
            }
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div 
          className="relative max-w-4xl mx-auto"
          ref={carouselRef}
          variants={fadeInUp}
          initial="hidden"
          animate={carouselControls}
        >
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: isArabic 
                  ? `translateX(${currentSlide * 100}%)` 
                  : `translateX(-${currentSlide * 100}%)` 
              }}
              variants={staggerContainer}
            >
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.id} className="w-full flex-shrink-0" variants={scaleIn}>
                  <motion.div 
                    className="bg-brand-dark-100 rounded-2xl p-6 sm:p-8 lg:p-12 border border-brand-dark-300 mx-2 sm:mx-4"
                  >
                    {/* Quote Icon */}
                    <motion.div 
                      className="flex justify-center mb-4 sm:mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <motion.div 
                        className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25"
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </motion.div>
                    </motion.div>

                    {/* Rating */}
                    <motion.div 
                      className="flex justify-center mb-4 sm:mb-6"
                      variants={staggerContainer}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          variants={scaleIn}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + (i * 0.1), duration: 0.3 }}
                        >
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Testimonial Text */}
                    <blockquote className="text-base sm:text-lg lg:text-xl text-brand-white text-center leading-relaxed mb-6 sm:mb-8 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-red-500"
                      />
                      <div className="text-center">
                        <div className="font-semibold text-brand-white text-sm sm:text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-red-500 text-xs sm:text-sm">
                          {testimonial.position}
                        </div>
                        <div className="text-brand-gray-100 text-xs sm:text-sm">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={isArabic ? nextSlide : prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-8 h-8 sm:w-12 sm:h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-brand-white transition-all duration-300 hover:shadow-sm hover:shadow-red-500/25 hover:scale-110 cursor-pointer"
          >
            {isArabic ? <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" /> : <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />}
          </motion.button>

          <motion.button
            onClick={isArabic ? prevSlide : nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 w-8 h-8 sm:w-12 sm:h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-brand-white transition-all duration-300 hover:shadow-sm hover:shadow-red-500/25 hover:scale-110 cursor-pointer"
          >
            {isArabic ? <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" /> : <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />}
          </motion.button>
        </motion.div>

        {/* Carousel Indicators */}
        <motion.div 
          className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3"
          variants={staggerContainer}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide
                  ? 'bg-red-500 scale-125'
                  : 'bg-brand-dark-300 hover:bg-red-500/50'
              }`}
              variants={fadeInUp}
            />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center mt-6 sm:mt-8"
          variants={fadeInUp}
        >
          <motion.div
            variants={fadeInUp}
          >
            <Button 
              variant="animated" 
              size="lg"
              onClick={() => console.log('Get Started Today clicked!')}
              className="hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
            >
              {isArabic ? 'ابدأ مشروعك اليوم' : 'Get Started Today'}
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-brand-dark-300"
          ref={statsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={statsControls}
        >
          <motion.div 
            className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={fadeInUp}
          >
            <motion.div 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              98%
            </motion.div>
            <div className="text-xs sm:text-sm text-brand-gray-100">{isArabic ? 'رضا العملاء' : 'Client Satisfaction'}</div>
          </motion.div>
          <motion.div 
            className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={fadeInUp}
          >
            <motion.div 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              200+
            </motion.div>
            <div className="text-xs sm:text-sm text-brand-gray-100">{isArabic ? 'عميل سعيد' : 'Happy Clients'}</div>
          </motion.div>
          <motion.div 
            className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={fadeInUp}
          >
            <motion.div 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              350+
            </motion.div>
            <div className="text-xs sm:text-sm text-brand-gray-100">{isArabic ? 'مشروع مكتمل' : 'Projects Completed'}</div>
          </motion.div>
          <motion.div 
            className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            variants={fadeInUp}
          >
            <motion.div 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              5 {isArabic ? 'سنوات' : 'Years'}
            </motion.div>
            <div className="text-xs sm:text-sm text-brand-gray-100">{isArabic ? 'متوسط الشراكة' : 'Average Partnership'}</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TestimonialsSection 