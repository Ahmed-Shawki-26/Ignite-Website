'use client'

import { useState } from 'react'
import { ExternalLink, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { useViewAnimation, fadeInUp, staggerContainer, scaleIn } from '@/hooks/useViewAnimation'

const WorksSection = () => {
  // Get locale from URL path
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const isArabic = locale === 'ar'

  const [activeFilter, setActiveFilter] = useState(isArabic ? 'الكل' : 'All')

  // View animations
  const { ref: sectionRef, controls: sectionControls } = useViewAnimation({ threshold: 0.1 })
  const { ref: headerRef, controls: headerControls } = useViewAnimation({ threshold: 0.3 })
  const { ref: filtersRef, controls: filtersControls } = useViewAnimation({ threshold: 0.2 })
  const { ref: projectsRef, controls: projectsControls } = useViewAnimation({ threshold: 0.2 })
  const { ref: ctaRef, controls: ctaControls } = useViewAnimation({ threshold: 0.3 })

  const filters = isArabic 
    ? ['الكل', 'تصميم المواقع', 'التجارة الإلكترونية', 'العلامة التجارية', 'تطبيق الهاتف', 'التسويق الرقمي']
    : ['All', 'Web Design', 'E-commerce', 'Branding', 'Mobile App', 'Digital Marketing']

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      client: "Fashion Forward Egypt",
      category: "E-commerce",
      tags: ["E-commerce", "Web Design"],
      description: "Complete e-commerce solution with mobile-first design and integrated payment gateway",
      image: "https://picsum.photos/600/400?random=1",
      featured: true
    },
    {
      id: 2,
      title: "Brand Identity Redesign",
      client: "Cairo Tech Solutions",
      category: "Branding",
      tags: ["Branding", "Digital Marketing"],
      description: "Complete brand overhaul including logo, visual identity, and marketing materials",
      image: "https://picsum.photos/600/400?random=2",
      featured: true
    },
    {
      id: 3,
      title: "Restaurant Mobile App",
      client: "Nile Cuisine",
      category: "Mobile App",
      tags: ["Mobile App", "Web Design"],
      description: "Food delivery app with real-time tracking and integrated payment system",
      image: "https://picsum.photos/600/400?random=3",
      featured: false
    },
    {
      id: 4,
      title: "Digital Marketing Campaign",
      client: "Green Energy Egypt",
      category: "Digital Marketing",
      tags: ["Digital Marketing", "Branding"],
      description: "360° digital marketing campaign resulting in 300% increase in brand awareness",
      image: "https://picsum.photos/600/400?random=4",
      featured: true
    },
    {
      id: 5,
      title: "Corporate Website",
      client: "Alexandria Holdings",
      category: "Web Design",
      tags: ["Web Design", "Branding"],
      description: "Modern corporate website with custom CMS and multilingual support",
      image: "https://picsum.photos/600/400?random=5",
      featured: false
    },
    {
      id: 6,
      title: "Healthcare Platform",
      client: "MedCare Plus",
      category: "Web Design",
      tags: ["Web Design", "Mobile App"],
      description: "Patient management system with appointment booking and telemedicine features",
      image: "https://picsum.photos/600/400?random=6",
      featured: true
    }
  ]

  const filteredProjects = activeFilter === (isArabic ? 'الكل' : 'All')
    ? projects
    : projects.filter(project => {
        const englishTags = ['All', 'Web Design', 'E-commerce', 'Branding', 'Mobile App', 'Digital Marketing']
        const arabicTags = ['الكل', 'تصميم المواقع', 'التجارة الإلكترونية', 'العلامة التجارية', 'تطبيق الهاتف', 'التسويق الرقمي']
        const tags = isArabic ? arabicTags : englishTags
        const tagIndex = tags.indexOf(activeFilter)
        const englishTag = englishTags[tagIndex]
        return project.tags.includes(englishTag)
      })

  return (
    <section id="projects" className="section-padding bg-brand-dark-100 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
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
              {isArabic ? 'أعمالنا' : 'Our Portfolio'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-brand-white leading-tight">
            {isArabic ? 'أحدث' : 'Our Latest'}{' '}
            <span className="text-brand-red">{isArabic ? 'أعمالنا' : 'Work'}</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-gray-100 max-w-3xl mx-auto leading-relaxed px-4">
            {isArabic 
              ? 'استكشف مشاريعنا الحديثة وشاهد كيف ساعدنا الشركات على تحويل حضورها الرقمي وتحقيق نتائج رائعة.'
              : "Explore our recent projects and see how we've helped businesses transform their digital presence and achieve remarkable results."
            }
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
          ref={filtersRef}
          variants={fadeInUp}
          initial="hidden"
          animate={filtersControls}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-sm cursor-pointer text-xs sm:text-sm ${
                activeFilter === filter
                  ? 'bg-red-600 text-brand-white hover:bg-red-700 hover:shadow-red-500/25'
                  : 'bg-brand-dark-200 text-brand-white hover:bg-red-500/20 hover:text-red-500 hover:shadow-red-500/10 hover:border hover:border-red-500/30'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
          ref={projectsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={projectsControls}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group bg-brand-dark-200 rounded-xl sm:rounded-2xl overflow-hidden border border-brand-dark-300 hover:border-red-500/50 transition-all duration-300 hover:scale-105"
              variants={fadeInUp}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2 sm:space-x-4">
                    <button className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center text-brand-white hover:bg-red-700 transition-colors duration-300 hover:scale-110 cursor-pointer">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-white rounded-full flex items-center justify-center text-brand-black hover:bg-brand-gray-100 transition-colors duration-300 hover:scale-110 cursor-pointer">
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
                {project.featured && (
                  <motion.div 
                    className="absolute top-3 sm:top-4 left-3 sm:left-4"
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <span className="bg-brand-red text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                      {isArabic ? 'مميز' : 'Featured'}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-brand-white group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-red-500 text-xs sm:text-sm font-medium">
                    {project.client}
                  </p>
                </div>

                <p className="text-brand-gray-100 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-1 bg-red-500/20 text-red-500 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div 
          className="text-center"
          ref={ctaRef}
          variants={fadeInUp}
          initial="hidden"
          animate={ctaControls}
        >
          <motion.button 
            className="btn-secondary bg-red-600 hover:bg-red-700 text-white cursor-pointer w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:py-4"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isArabic ? 'عرض جميع المشاريع' : 'View All Projects'}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default WorksSection 