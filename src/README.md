# Ignite Website - Source Code Organization

## 📁 Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalization routes
│   │   ├── contact/              # Contact page
│   │   ├── layout.tsx            # Locale-specific layout
│   │   └── page.tsx              # Home page
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── layout/                   # Layout components
│   │   ├── Navigation.tsx        # Main navigation
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Layout.tsx            # Main layout wrapper
│   │   └── index.ts              # Layout exports
│   ├── shared/                   # Shared components across pages
│   │   ├── FAQSection.tsx        # FAQ component (used on multiple pages)
│   │   └── index.ts              # Shared exports
│   ├── sections/                 # Page sections (currently empty)
│   ├── ui/                       # Basic UI components
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Card.tsx              # Card component
│   │   └── index.ts              # UI exports
│   ├── forms/                    # Form components
│   │   ├── ContactForm.tsx       # Contact form
│   │   └── FreeTrialForm.tsx     # Free trial form
│   ├── contact/                  # Contact-specific components
│   │   └── ContactInfo.tsx       # Contact information component
│   ├── home/                     # Home page specific components
│   │   ├── Hero.tsx              # Hero section
│   │   ├── ServicesPreview.tsx   # Services preview
│   │   ├── PortfolioPreview.tsx  # Portfolio preview
│   │   ├── TeamPreview.tsx       # Team preview
│   │   ├── Testimonials.tsx      # Testimonials
│   │   ├── ContactCTA.tsx        # Contact CTA
│   │   ├── Stats.tsx             # Statistics
│   │   └── index.ts              # Home exports
│   ├── hero/                     # Hero-specific components
│   └── dashboard/                # Dashboard components
├── pages/                        # Page-specific component organization
│   ├── home/                     # Home page components
│   │   ├── HeroSection.tsx       # Main hero section
│   │   ├── TestimonialsSection.tsx # Testimonials section
│   │   └── index.ts              # Home page exports
│   ├── contact/                  # Contact page components (empty - ready for future)
│   ├── about/                    # About page components
│   │   ├── AboutSection.tsx      # About section
│   │   └── index.ts              # About page exports
│   ├── services/                 # Services page components
│   │   ├── ServicesSection.tsx   # Services section
│   │   └── index.ts              # Services page exports
│   ├── projects/                 # Projects page components
│   │   ├── WorksSection.tsx      # Works/Portfolio section
│   │   └── index.ts              # Projects page exports
│   └── blog/                     # Blog page components (empty - ready for future)
├── lib/                          # Utility libraries
│   ├── i18n.ts                   # Internationalization config
│   ├── i18n-client.ts            # Client-side i18n
│   ├── utils.ts                  # Utility functions
│   ├── mongodb.ts                # Database connection
│   └── google-sheets.ts          # Google Sheets integration
├── contexts/                     # React contexts
│   └── LanguageContext.tsx       # Language context
└── types/                        # TypeScript type definitions
    └── index.ts                  # Type definitions
```

## 🏗️ Organization Principles

### 1. **Page-Specific Components** (`src/pages/`)
- Components that are specifically designed for a single page
- Each page has its own folder with dedicated components
- Uses index.ts files for clean imports
- **Current Status**: Only home page is fully organized

### 2. **Layout Components** (`src/components/layout/`)
- Components that define the overall page structure
- Navigation, Footer, main Layout wrapper
- Used across all pages
- **Status**: ✅ Fully organized

### 3. **Shared Components** (`src/components/shared/`)
- Components used across multiple pages
- FAQ section, shared forms, common UI elements
- Promotes code reusability
- **Status**: ✅ Fully organized

### 4. **UI Components** (`src/components/ui/`)
- Basic, reusable UI building blocks
- Buttons, Cards, Input fields, etc.
- Design system components
- **Status**: ✅ Fully organized

### 5. **Feature-Specific Components** (`src/components/[feature]/`)
- Components grouped by feature or functionality
- Forms, home-specific components, contact components
- Logical grouping for easier maintenance
- **Status**: ✅ Organized

## ⚠️ **Current Issues & TODO**

### **Components Successfully Moved** ✅:
- `AboutSection.tsx` → Moved to `src/pages/about/`
- `ServicesSection.tsx` → Moved to `src/pages/services/`
- `TestimonialsSection.tsx` → Moved to `src/pages/home/`
- `WorksSection.tsx` → Moved to `src/pages/projects/`

### **Empty Directories** (Ready for future use):
- `src/components/sections/` - Empty, can be removed or used for future sections
- `src/pages/contact/` - Ready for contact page components
- `src/pages/about/` - Ready for about page components
- `src/pages/services/` - Ready for services page components
- `src/pages/projects/` - Ready for projects page components
- `src/pages/blog/` - Ready for blog page components

## 📦 Import Strategy

### Clean Imports with Index Files
```typescript
// ✅ Good - Clean imports using index files
import { Navigation, Footer } from '@/components/layout'
import { HeroSection } from '@/pages/home'
import { FAQSection } from '@/components/shared'

// ❌ Avoid - Direct file imports for organized components
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
```

### Path Aliases
- `@/` points to the `src/` directory
- Consistent absolute imports across the project
- Easier refactoring and better IDE support

## 🎯 Benefits of This Organization

1. **Scalability**: Easy to add new pages and features
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Shared components reduce duplication
4. **Developer Experience**: Intuitive file structure
5. **Team Collaboration**: Clear ownership of components
6. **Performance**: Easy to implement code splitting per page

## 🔄 Migration Notes

- ✅ Layout components moved from root to `components/layout/`
- ✅ Page-specific sections moved to `pages/[pageName]/`
- ✅ Shared components like FAQ moved to `components/shared/`
- ✅ Import statements updated to use new paths
- ✅ Index files created for clean imports
- ⚠️ **Pending**: Move remaining section components to their respective page folders

## 🚀 Future Expansion

When adding new pages:
1. Create folder in `src/pages/[pageName]/`
2. Add page-specific components
3. Create index.ts for exports
4. Update shared components if needed
5. Add to navigation and routing

## 📋 **Next Steps for Complete Organization**

1. **Move AboutSection.tsx** to `src/pages/about/`
2. **Move ServicesSection.tsx** to `src/pages/services/`
3. **Move TestimonialsSection.tsx** to `src/pages/home/`
4. **Move WorksSection.tsx** to `src/pages/projects/`
5. **Update imports** in main page files
6. **Remove empty directories** if not needed

This structure supports the growth from a simple landing page to a full-featured website with multiple pages, while maintaining clean organization and developer experience.