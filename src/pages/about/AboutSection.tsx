'use client'

import { CheckCircle, Users, Target, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useViewAnimation, fadeInUp, fadeInRight, staggerContainer, scaleIn } from '@/hooks/useViewAnimation'

const AboutSection = () => {
  // Get locale from URL path
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const isArabic = locale === 'ar'

  // View animations
  const { ref: sectionRef, controls: sectionControls } = useViewAnimation({ threshold: 0.2 })
  const { ref: leftRef, controls: leftControls } = useViewAnimation({ threshold: 0.3 })
  const { ref: rightRef, controls: rightControls } = useViewAnimation({ threshold: 0.3 })

  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: isArabic ? "خبرة عميقة بالسوق المصري" : "Expert Egyptian Market Knowledge",
      description: isArabic 
        ? "فهم عميق لديناميكيات السوق المحلي وسلوك المستهلكين"
        : "Deep understanding of local market dynamics and consumer behavior"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: isArabic ? "مجموعة من المتخصصين" : "Collective of Specialists",
      description: isArabic 
        ? "الوصول إلى خبرات متنوعة من شبكة المتخصصين في التسويق"
        : "Access to diverse expertise from our network of marketing professionals"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: isArabic ? "نهج مرن وسريع" : "Agile & Flexible Approach",
      description: isArabic 
        ? "التكيف السريع مع تغيرات السوق واحتياجات العملاء"
        : "Quick adaptation to market changes and client needs"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: isArabic ? "سجل حافل بالنجاح" : "Proven Track Record",
      description: isArabic 
        ? "معدل نجاح 98% مع أكثر من 200 عميل راضٍ في جميع أنحاء مصر"
        : "98% success rate with 200+ satisfied clients across Egypt"
    }
  ]

  const teamFeatures = isArabic 
    ? [
        "متخصصون في التسويق ذوو خبرة",
        "خبرة في السوق المحلي",
        "سير عمل تعاوني",
        "دعم متاح 24/7",
        "حلول فعالة من حيث التكلفة",
        "موارد فريق قابلة للتوسع"
      ]
    : [
        "Experienced marketing professionals",
        "Local market expertise",
        "Collaborative workflow",
        "24/7 support coverage",
        "Cost-effective solutions",
        "Scalable team resources"
      ]

  return (
    <section id="about" className="section-padding bg-brand-dark-100 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <motion.div 
        className="container-custom"
        variants={staggerContainer}
        initial="hidden"
        animate={sectionControls}
      >
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-6 sm:space-y-8" 
            ref={leftRef}
            variants={fadeInUp}
            initial="hidden"
            animate={leftControls}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block">
                <span className="text-red-500 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                  {isArabic ? 'عن فريق إغنايت للتسويق' : 'About Ignite Marketing'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-white leading-tight">
                {isArabic ? 'تحويل الأعمال من خلال' : 'Transforming Businesses Through'}{' '}
                <span className="text-brand-red">{isArabic ? 'التسويق الاستراتيجي' : 'Strategic Marketing'}</span>
              </h2>

              <p className="text-base sm:text-lg text-brand-gray-100 leading-relaxed">
                {isArabic 
                  ? 'نحن مجموعة ديناميكية من المتخصصين في التسويق ذوي الخبرة مقرها مصر، نجمع خبرات متنوعة لتقديم حلول تسويق رقمي شاملة. يفهم فريقنا التحديات والفرص الفريدة في السوق المصري.'
                  : "We are a dynamic collective of experienced marketing professionals based in Egypt, bringing together diverse expertise to deliver comprehensive digital marketing solutions. Our team understands the unique challenges and opportunities in the Egyptian market."
                }
              </p>

              <p className="text-sm sm:text-base text-brand-gray-100 leading-relaxed">
                {isArabic 
                  ? 'من خلال الجمع بين أفضل الممارسات الدولية ورؤى السوق المحلي، نساعد الشركات من جميع الأحجام على إنشاء حضور رقمي قوي، وجذب جمهورها المستهدف بفعالية، وتحقيق نمو قابل للقياس في المشهد الرقمي التنافسي.'
                  : "By combining international best practices with local market insights, we help businesses of all sizes establish a strong digital presence, engage their target audience effectively, and achieve measurable growth in the competitive digital landscape."
                }
              </p>
            </div>

            {/* Team Collaboration Features */}
            <motion.div 
              className="space-y-3 sm:space-y-4"
              variants={fadeInUp}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-brand-white">
                {isArabic ? 'كيف يعمل فريقنا' : 'How Our Collective Works'}
              </h3>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
                variants={staggerContainer}
              >
                {teamFeatures.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-2"
                    variants={fadeInUp}
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                    <span className="text-brand-gray-100 text-xs sm:text-sm">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Benefits Grid */}
          <motion.div 
            className="space-y-4 sm:space-y-6" 
            ref={rightRef}
            variants={fadeInRight}
            initial="hidden"
            animate={rightControls}
          >
            <motion.div 
              className="space-y-3 sm:space-y-4"
              variants={fadeInUp}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white">
                {isArabic ? 'لماذا تختار فريقنا؟' : 'Why Choose Our Collective?'}
              </h3>
              <p className="text-sm sm:text-base text-brand-gray-100">
                {isArabic 
                  ? 'اختبر ميزة العمل مع أكثر المتخصصين في التسويق ابتكاراً في مصر.'
                  : "Experience the advantage of working with Egypt's most innovative marketing professionals."
                }
              </p>
            </motion.div>

            <motion.div 
              className="grid gap-4 sm:gap-6"
              variants={staggerContainer}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-brand-dark-200 rounded-lg p-4 sm:p-6 border border-brand-dark-300 hover:border-red-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                  variants={fadeInUp}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div 
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-500"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="text-base sm:text-lg font-semibold text-brand-white">
                        {benefit.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-brand-gray-100 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutSection 