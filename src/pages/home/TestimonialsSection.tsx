'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import Button from '../../components/ui/Button'

const TestimonialsSection = () => {
  // Get locale from URL path
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const isArabic = locale === 'ar'

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)

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
    <section className="section-padding bg-brand-black">
      <div className="container-custom">
                 {/* Section Header */}
         <div className="text-center space-y-6 mb-16 animate-fade-in-up">
           <div className="inline-block">
             <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">
               {isArabic ? 'قصص نجاح العملاء' : 'Client Success Stories'}
             </span>
           </div>
           <h2 className="text-3xl lg:text-5xl font-bold text-brand-white leading-tight">
             {isArabic ? 'ماذا يقول' : 'What Our Clients'}{' '}
             <span className="text-red-500">{isArabic ? 'عملاؤنا' : 'Say'}</span>
           </h2>
          <p className="text-lg text-brand-gray-100 max-w-3xl mx-auto leading-relaxed">
            {isArabic 
              ? 'لا تأخذ كلمتنا فقط. إليك ما يقوله عملاؤنا عن تجربتهم في العمل مع فريق التسويق الجماعي لدينا.'
              : "Don't just take our word for it. Here's what our clients have to say about their experience working with our marketing collective."
            }
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
                         <div
               className="flex transition-transform duration-500 ease-in-out"
               style={{ 
                 transform: isArabic 
                   ? `translateX(${currentSlide * 100}%)` 
                   : `translateX(-${currentSlide * 100}%)` 
               }}
             >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-brand-dark-100 rounded-2xl p-8 lg:p-12 border border-brand-dark-300 mx-4">
                                                               {/* Quote Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25">
                          <Quote className="w-8 h-8 text-red-500" />
                        </div>
                      </div>

                     {/* Rating */}
                     <div className="flex justify-center mb-6">
                       {[...Array(testimonial.rating)].map((_, i) => (
                         <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                       ))}
                     </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg lg:text-xl text-brand-white text-center leading-relaxed mb-8 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center justify-center space-x-4">
                                             <img
                         src={testimonial.image}
                         alt={testimonial.name}
                         className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                       />
                       <div className="text-center">
                         <div className="font-semibold text-brand-white text-lg">
                           {testimonial.name}
                         </div>
                         <div className="text-red-500 text-sm">
                           {testimonial.position}
                         </div>
                         <div className="text-brand-gray-100 text-sm">
                           {testimonial.company}
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

                     {/* Navigation Buttons */}
           <button
             onClick={isArabic ? nextSlide : prevSlide}
             className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-brand-white transition-all duration-300 hover:scale-110 hover:shadow-sm hover:shadow-red-500/25 cursor-pointer"
           >
             {isArabic ? <ChevronLeft className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
           </button>

           <button
             onClick={isArabic ? prevSlide : nextSlide}
             className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-brand-white transition-all duration-300 hover:scale-110 hover:shadow-sm hover:shadow-red-500/25 cursor-pointer"
           >
             {isArabic ? <ChevronRight className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
           </button>
        </div>

                 {/* Carousel Indicators */}
         <div className="flex justify-center mt-8 space-x-3">
           {testimonials.map((_, index) => (
             <button
               key={index}
               onClick={() => setCurrentSlide(index)}
               className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                 index === currentSlide
                   ? 'bg-red-500 scale-125'
                   : 'bg-brand-dark-300 hover:bg-red-500/50'
               }`}
             />
           ))}
         </div>

         {/* CTA Button */}
         <div className="flex justify-center mt-8">
           <Button 
             variant="animated" 
             size="lg"
             onClick={() => console.log('Get Started Today clicked!')}
           >
             {isArabic ? 'ابدأ مشروعك اليوم' : 'Get Started Today'}
           </Button>
         </div>

                 {/* Stats Section */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-brand-dark-300">
           <div className="text-center animate-fade-in-up">
             <div className="text-3xl lg:text-4xl font-bold text-red-500 mb-2">98%</div>
             <div className="text-brand-gray-100">Client Satisfaction</div>
           </div>
           <div className="text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
             <div className="text-3xl lg:text-4xl font-bold text-red-500 mb-2">200+</div>
             <div className="text-brand-gray-100">Happy Clients</div>
           </div>
           <div className="text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             <div className="text-3xl lg:text-4xl font-bold text-red-500 mb-2">350+</div>
             <div className="text-brand-gray-100">Projects Completed</div>
           </div>
           <div className="text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
             <div className="text-3xl lg:text-4xl font-bold text-red-500 mb-2">5 Years</div>
             <div className="text-brand-gray-100">Average Partnership</div>
           </div>
         </div>
      </div>
    </section>
  )
}

export default TestimonialsSection 