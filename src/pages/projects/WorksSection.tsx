'use client'

import { useState } from 'react'
import { ExternalLink, Eye } from 'lucide-react'

const WorksSection = () => {
  // Get locale from URL path
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
  const isArabic = locale === 'ar'

  const [activeFilter, setActiveFilter] = useState(isArabic ? 'الكل' : 'All')

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
    <section id="projects" className="section-padding bg-brand-dark-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in-up">
          <div className="inline-block">
            <span className="text-red-500 font-semibold uppercase tracking-wider text-sm">
              {isArabic ? 'أعمالنا' : 'Our Portfolio'}
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-white leading-tight">
            {isArabic ? 'أحدث' : 'Our Latest'}{' '}
            <span className="text-brand-red">{isArabic ? 'أعمالنا' : 'Work'}</span>
          </h2>
          <p className="text-lg text-brand-gray-100 max-w-3xl mx-auto leading-relaxed">
            {isArabic 
              ? 'استكشف مشاريعنا الحديثة وشاهد كيف ساعدنا الشركات على تحويل حضورها الرقمي وتحقيق نتائج رائعة.'
              : "Explore our recent projects and see how we've helped businesses transform their digital presence and achieve remarkable results."
            }
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-sm cursor-pointer ${
                activeFilter === filter
                  ? 'bg-red-600 text-brand-white hover:bg-red-700 hover:shadow-red-500/25'
                  : 'bg-brand-dark-200 text-brand-white hover:bg-red-500/20 hover:text-red-500 hover:shadow-red-500/10 hover:border hover:border-red-500/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-brand-dark-200 rounded-2xl overflow-hidden border border-brand-dark-300 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-brand-white hover:bg-red-700 transition-colors duration-300 cursor-pointer">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-brand-white rounded-full flex items-center justify-center text-brand-black hover:bg-brand-gray-100 transition-colors duration-300 cursor-pointer">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full">
                      {isArabic ? 'مميز' : 'Featured'}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-brand-white group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-red-500 text-sm font-medium">
                    {project.client}
                  </p>
                </div>

                <p className="text-brand-gray-100 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-red-500/20 text-red-500 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center animate-fade-in-up">
          <button className="btn-secondary bg-red-600 hover:bg-red-700 text-white cursor-pointer">
            {isArabic ? 'عرض جميع المشاريع' : 'View All Projects'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default WorksSection 