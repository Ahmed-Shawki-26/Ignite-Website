import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import FreeTrialForm from '@/components/forms/FreeTrialForm';
import { FAQSection } from '@/components/shared';
import { Navigation, Footer } from '@/components/layout';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeStr = locale as 'en' | 'ar';

  return {
    title: localeStr === 'ar' ? 'تواصل معنا' : 'Contact Us',
    description: localeStr === 'ar' 
      ? 'تواصل مع فريق إغنايت للتسويق لمناقشة مشروعك وكيف يمكننا مساعدتك في تحقيق أهدافك'
      : 'Get in touch with Ignite Marketing team to discuss your project and how we can help you achieve your goals',
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const localeStr = locale as 'en' | 'ar';
  const isRTL = localeStr === 'ar';

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #000000 100%)' }}>
      {/* Navigation */}
      <Navigation />
      
      {/* Background Elements */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #262626 50%, #000000 100%)' }}></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute rounded-full animate-pulse" style={{ 
        top: '5rem', 
        [isRTL ? 'right' : 'left']: '5rem', 
        width: '18rem', 
        height: '18rem', 
        backgroundColor: '#B8001F', 
        opacity: 0.1, 
        filter: 'blur(3rem)' 
      }}></div>
      <div className="absolute rounded-full animate-pulse" style={{ 
        bottom: '5rem', 
        [isRTL ? 'left' : 'right']: '5rem', 
        width: '24rem', 
        height: '24rem', 
        backgroundColor: '#CE8D63', 
        opacity: 0.05, 
        filter: 'blur(3rem)',
        animationDelay: '1s'
      }}></div>

      {/* Header Section */}
      <section className="relative pt-32 pb-12">
        <div className="container-custom relative z-10">
          <div className="text-center mx-auto" style={{ maxWidth: '64rem' }}>
            <h1 className="font-bold mb-6 animate-fade-in-up" style={{ 
              fontSize: 'clamp(2rem, 6vw, 4rem)', 
              color: '#FFFFFF', 
              lineHeight: '1.2' 
            }}>
              {localeStr === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h1>
            <p className="mb-8 mx-auto leading-relaxed animate-fade-in-up" style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#B3B3D2',
              maxWidth: '32rem',
              animationDelay: '0.4s' 
            }}>
              {localeStr === 'ar' 
                ? 'دعنا نناقش مشروعك وكيف يمكننا مساعدتك في تحقيق أهدافك'
                : 'Let\'s discuss your project and how we can help you achieve your goals'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Contact Forms Section */}
      <section className="relative pt-8 pb-16">
        <div className="container-custom relative z-10">
          <div className={`grid lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Contact Form */}
            <div className={`animate-fade-in-up ${isRTL ? 'lg:col-start-2' : ''}`} style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-sm p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
                  {localeStr === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
                </h2>
                <ContactForm locale={localeStr} />
              </div>
            </div>

            {/* Free Trial Form */}
            <div className={`animate-fade-in-up ${isRTL ? 'lg:col-start-1' : ''}`} style={{ animationDelay: '0.8s' }}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-sm p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
                  {localeStr === 'ar' ? 'طلب تجربة مجانية' : 'Free Trial Request'}
                </h2>
                <FreeTrialForm locale={localeStr} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection locale={localeStr} />

      {/* Footer */}
      <Footer locale={localeStr} />
    </div>
  );
} 