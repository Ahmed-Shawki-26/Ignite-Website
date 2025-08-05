'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'

const HeroSection = () => {
  // Get locale from URL path
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const isArabic = locale === 'ar'

  const stats = [
    { number: '200+', label: isArabic ? 'عميل سعيد' : 'Happy Clients' },
    { number: '350+', label: isArabic ? 'مشروع منجز' : 'Projects Done' },
    { number: '98%', label: isArabic ? 'معدل النجاح' : 'Success Rate' },
    { number: '24/7', label: isArabic ? 'دعم متاح' : 'Support' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  }

  const dashboardVariants = {
    hidden: { opacity: 0, x: 50, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 1, delay: 0.5 }
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-bg overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-red-500/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-brand-red/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-10 sm:left-20 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-red-600/20 rounded-full"
          animate={{
            x: [0, 30, 0],
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 sm:right-40 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-700/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }}
        />
      </div>

      <motion.div
        className="container-custom relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div className="space-y-6 sm:space-y-8 text-center lg:text-left" variants={itemVariants}>
            <motion.div className="space-y-4 sm:space-y-6" variants={itemVariants}>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-white leading-tight"
                variants={itemVariants}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {isArabic ? 'أشعل حضور علامتك التجارية' : "Ignite Your Brand's"}{' '}
                </motion.span>
                <motion.span
                  className="text-brand-red"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {isArabic ? 'الرقمي' : 'Digital Presence'}
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-brand-gray-100 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                variants={itemVariants}
              >
                {isArabic 
                  ? 'نحن مجموعة من المتخصصين في التسويق ذوي الخبرة من مصر، مستعدون لتحويل عملك باستراتيجيات رقمية مبتكرة تحقق نتائج حقيقية.'
                  : "We're a collective of experienced marketing professionals from Egypt, ready to transform your business with innovative digital solutions that drive real results."
                }
              </motion.p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Button
                variant="animated"
                size="lg"
                onClick={() => console.log('Start Free Trial clicked!')}
                className="text-center hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
              >
                {isArabic ? 'ابدأ تجربتك المجانية' : 'Start Your Free Trial'}
              </Button>
              <motion.button
                className="btn-creative group relative hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
                transition={{ duration: 0.2 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--x', `${x}%`);
                  e.currentTarget.style.setProperty('--y', `${y}%`);
                }}
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="group-hover:rotate-0 relative z-10"
                >
                  <Play size={16} />
                </motion.div>
                <span className="relative z-10">{isArabic ? 'شاهد أعمالنا' : 'View Our Work'}</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                  variants={statsVariants}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 1 + (index * 0.2)
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs sm:text-sm text-brand-gray-200 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Interactive Logo */}
          <motion.div
            className="relative flex items-center justify-center mt-8 lg:mt-0"
            variants={dashboardVariants}
          >
            <motion.div
              className="logo-3d-container w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center cursor-pointer"
              style={{ 
                perspective: "1000px",
                border: "none",
                background: "transparent"
              }}
            >
              <motion.div
                className="logo-3d relative"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  rotateY: [0, 5, -5, 0],
                  rotateX: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 0,
                  rotateX: 0,
                  transition: { duration: 0.3 }
                }}
                onMouseMove={(e: React.MouseEvent) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const centerY = rect.top + rect.height / 2;
                  const rotateX = (e.clientY - centerY) / 8;
                  const rotateY = (e.clientX - centerX) / 8;
                  
                  const element = e.currentTarget as HTMLElement;
                  element.style.transition = 'transform 0.1s ease-out';
                  element.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(50px) scale(1.1)`;
                }}
                onMouseLeave={(e: React.MouseEvent) => {
                  const element = e.currentTarget as HTMLElement;
                  element.style.transition = 'transform 0.6s ease-out';
                  element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
                  
                  // Clear the inline styles after animation completes to let Framer Motion take over
                  setTimeout(() => {
                    element.style.transform = '';
                    element.style.transition = '';
                  }, 600);
                }}
              >
                {/* Main Logo with Light Sweep Effect */}
                <div className="relative">
                  <motion.img
                    src="/favicon.png"
                    alt="Ignite Logo"
                    className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain filter drop-shadow-lg relative z-10"
                    style={{
                      filter: "drop-shadow(0 0 15px rgba(220, 20, 60, 0.2))"
                    }}
                    animate={{
                      filter: [
                        "drop-shadow(0 0 15px rgba(220, 20, 60, 0.2))",
                        "drop-shadow(0 0 25px rgba(220, 20, 60, 0.4))",
                        "drop-shadow(0 0 15px rgba(220, 20, 60, 0.2))"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Light Sweep Overlay - Only on Logo */}
                  <motion.div
                    className="absolute inset-0 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 overflow-hidden"
                    style={{
                      maskImage: "url(/favicon.png)",
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskImage: "url(/favicon.png)",
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, transparent 0%, transparent 45%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.3) 55%, transparent 100%)",
                        transform: "skew(-20deg)",
                        width: "120%",
                        height: "120%",
                        left: "-10%",
                        top: "-10%",
                      }}
                      animate={{
                        x: [-500, 500],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 3,
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-8 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full"
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    boxShadow: "0 0 20px rgba(220, 20, 60, 0.6)"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full"
                  animate={{
                    y: [10, -10, 10],
                    rotate: [360, 0],
                    scale: [1.2, 0.8, 1.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  style={{
                    boxShadow: "0 0 15px rgba(251, 146, 60, 0.6)"
                  }}
                />
                
                <motion.div
                  className="absolute top-8 -left-8 sm:top-10 sm:-left-10 lg:top-12 lg:-left-12 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"
                  animate={{
                    y: [-5, 15, -5],
                    x: [-5, 5, -5],
                    scale: [0.5, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  style={{
                    boxShadow: "0 0 10px rgba(250, 204, 21, 0.6)"
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection