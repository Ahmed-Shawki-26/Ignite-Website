'use client'

import { CheckCircle, Users, Target, Zap } from 'lucide-react'

const AboutSection = () => {
  // Get locale from URL path
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const isArabic = locale === 'ar'

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
    <section id="about" className="section-padding bg-brand-dark-100">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">
                  {isArabic ? 'عن فريق إغنايت للتسويق' : 'About Ignite Marketing'}
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-brand-white leading-tight">
                {isArabic ? 'تحويل الأعمال من خلال' : 'Transforming Businesses Through'}{' '}
                <span className="text-brand-red">{isArabic ? 'التسويق الاستراتيجي' : 'Strategic Marketing'}</span>
              </h2>

              <p className="text-lg text-brand-gray-100 leading-relaxed">
                {isArabic 
                  ? 'نحن مجموعة ديناميكية من المتخصصين في التسويق ذوي الخبرة مقرها مصر، نجمع خبرات متنوعة لتقديم حلول تسويق رقمي شاملة. يفهم فريقنا التحديات والفرص الفريدة في السوق المصري.'
                  : "We are a dynamic collective of experienced marketing professionals based in Egypt, bringing together diverse expertise to deliver comprehensive digital marketing solutions. Our team understands the unique challenges and opportunities in the Egyptian market."
                }
              </p>

              <p className="text-brand-gray-100 leading-relaxed">
                {isArabic 
                  ? 'من خلال الجمع بين أفضل الممارسات الدولية ورؤى السوق المحلي، نساعد الشركات من جميع الأحجام على إنشاء حضور رقمي قوي، وجذب جمهورها المستهدف بفعالية، وتحقيق نمو قابل للقياس في المشهد الرقمي التنافسي.'
                  : "By combining international best practices with local market insights, we help businesses of all sizes establish a strong digital presence, engage their target audience effectively, and achieve measurable growth in the competitive digital landscape."
                }
              </p>
            </div>

            {/* Team Collaboration Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-white">
                {isArabic ? 'كيف يعمل فريقنا' : 'How Our Collective Works'}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {teamFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-brand-gray-100 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Benefits Grid */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-brand-white">
                {isArabic ? 'لماذا تختار فريقنا؟' : 'Why Choose Our Collective?'}
              </h3>
              <p className="text-brand-gray-100">
                {isArabic 
                  ? 'اختبر ميزة العمل مع أكثر المتخصصين في التسويق ابتكاراً في مصر.'
                  : "Experience the advantage of working with Egypt's most innovative marketing professionals."
                }
              </p>
            </div>

            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-brand-dark-200 rounded-lg p-6 border border-brand-dark-300 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-500">
                      {benefit.icon}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-brand-white">
                        {benefit.title}
                      </h4>
                      <p className="text-brand-gray-100 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 