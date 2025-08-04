'use client'

import { useState } from 'react'
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp
} from 'lucide-react'
import Button from '../ui/Button'

interface FooterProps {
  locale: 'en' | 'ar';
}

const Footer = ({ locale }: FooterProps) => {
  const isArabic = locale === 'ar'
  const [email, setEmail] = useState('')

  const quickLinks = [
    { label: isArabic ? 'الرئيسية' : 'Home', href: '#home' },
    { label: isArabic ? 'من نحن' : 'About Us', href: '#about' },
    { label: isArabic ? 'فريقنا' : 'Our Team', href: '#team' },
    { label: isArabic ? 'الوظائف' : 'Careers', href: '#careers' },
    { label: isArabic ? 'المدونة' : 'Blog', href: '#blog' },
    { label: isArabic ? 'اتصل بنا' : 'Contact', href: '#contact' }
  ]

  const services = [
    { label: isArabic ? 'التسويق الرقمي' : 'Digital Marketing', href: '#services' },
    { label: isArabic ? 'تطوير المواقع' : 'Web Development', href: '#services' },
    { label: isArabic ? 'الهوية البصرية والتصميم' : 'Branding & Design', href: '#services' },
    { label: isArabic ? 'تطبيقات الهاتف' : 'Mobile Apps', href: '#services' },
    { label: isArabic ? 'خدمات تحسين محركات البحث' : 'SEO Services', href: '#services' },
    { label: isArabic ? 'وسائل التواصل الاجتماعي' : 'Social Media', href: '#services' }
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <span className="w-5 h-5 flex items-center justify-center text-white font-bold text-lg">𝕏</span>, href: '#', label: 'X' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' }
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="bg-brand-black border-t border-brand-dark-300" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-brand-red mb-4">
                Ignite
              </h1>
              <p className="text-brand-gray-100 leading-relaxed">
                {isArabic 
                  ? 'مجموعة من خبراء التسويق ذوي الخبرة من مصر، نحول الأعمال من خلال الحلول الرقمية المبتكرة.'
                  : 'A collective of experienced marketing professionals from Egypt, transforming businesses through innovative digital solutions.'
                }
              </p>
            </div>

                         {/* Contact Info */}
             <div className="space-y-3">
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                   <Phone className="w-4 h-4 text-red-500" />
                 </div>
                 <span className="text-brand-gray-100" dir="ltr">+20 123 456 7890</span>
               </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-brand-gray-100">info@igniteteam.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-brand-gray-100">{isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-brand-white mb-6">
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-brand-gray-100 hover:text-red-500 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-brand-white mb-6">
              {isArabic ? 'الخدمات' : 'Services'}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-brand-gray-100 hover:text-red-500 transition-colors duration-300"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-brand-white mb-6">
              {isArabic ? 'ابق على اطلاع' : 'Stay Updated'}
            </h3>
            <p className="text-brand-gray-100 mb-4">
              {isArabic 
                ? 'اشترك في نشرتنا الإخبارية للحصول على أحدث الرؤى ونصائح التسويق.'
                : 'Subscribe to our newsletter for the latest insights and marketing tips.'
              }
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  required
                  className="w-full px-4 py-3 bg-brand-dark-200 border border-brand-dark-300 rounded-lg text-brand-white placeholder-brand-gray-200 focus:outline-none focus:border-red-500 transition-colors duration-300"
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
                {isArabic ? 'اشتراك' : 'Subscribe'}
              </Button>
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-brand-gray-100 mb-4">{isArabic ? 'تابعنا:' : 'Follow us:'}</p>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-brand-dark-200 hover:bg-red-600 rounded-lg flex items-center justify-center text-brand-white hover:text-brand-white transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-brand-dark-300">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-brand-gray-200 text-sm">
              {isArabic 
                ? '© 2024 فريق إجنيت. جميع الحقوق محفوظة.'
                : '© 2024 Ignite Team. All rights reserved.'
              }
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-brand-gray-200 hover:text-red-500 text-sm transition-colors duration-300">
                {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-brand-gray-200 hover:text-red-500 text-sm transition-colors duration-300">
                {isArabic ? 'شروط الخدمة' : 'Terms of Service'}
              </a>
              <a href="#" className="text-brand-gray-200 hover:text-red-500 text-sm transition-colors duration-300">
                {isArabic ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}
              </a>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-brand-red hover:bg-red-700 rounded-lg flex items-center justify-center text-brand-white transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label={isArabic ? 'الانتقال إلى الأعلى' : 'Scroll to top'}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>


    </footer>
  )
}

export default Footer