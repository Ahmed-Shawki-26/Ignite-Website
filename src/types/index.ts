// Database Types
export interface Page {
  _id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  client: string;
  category: string;
  tags: string[];
  images: string[];
  featured: boolean;
  results: {
    en: string;
    ar: string;
  };
  technologies: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  bio: {
    en: string;
    ar: string;
  };
  image: string;
  email: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
    behance?: string;
  };
  specializations: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
}

export interface BlogPost {
  _id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  author: string; // ObjectId reference to team member
  category: string;
  tags: string[];
  featuredImage: string;
  published: boolean;
  publishedAt: Date;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id: string;
  slug: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  icon: string;
  features: Array<{
    en: string;
    ar: string;
  }>;
  pricing: {
    starting: number;
    currency: string;
  };
  category: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

export interface ContactSubmission {
  _id: string;
  type: 'contact' | 'free-trial';
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  language: 'en' | 'ar';
  status: 'new' | 'contacted' | 'converted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteSettings {
  _id: string;
  key: string;
  value: {
    en: string;
    ar: string;
  };
  type: 'text' | 'number' | 'boolean' | 'array';
  category: string;
  updatedAt: Date;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
}

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'orange';
  className?: string;
  onClick?: () => void;
}

export interface SectionProps {
  children: React.ReactNode;
  variant?: 'dark' | 'darker' | 'light' | 'orange-light' | 'red';
  className?: string;
  id?: string;
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  language: 'en' | 'ar';
}

export interface FreeTrialFormData {
  name: string;
  email: string;
  service: string;
  description: string;
  language: 'en' | 'ar';
}

// Navigation Types
export interface NavigationItem {
  label: {
    en: string;
    ar: string;
  };
  href: string;
  external?: boolean;
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// SEO Types
export interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

// Animation Types
export interface AnimationProps {
  children: React.ReactNode;
  animation?: 'fade-in-up' | 'slide-in-from-left' | 'scale-on-hover';
  delay?: number;
  duration?: number;
  className?: string;
}

// Stats Types
export interface Stat {
  number: string;
  label: {
    en: string;
    ar: string;
  };
  icon?: string;
}

// Testimonial Types
export interface Testimonial {
  _id: string;
  quote: {
    en: string;
    ar: string;
  };
  author: string;
  company: string;
  role: string;
  avatar: string;
  rating: number;
}

// Company Information
export interface CompanyInfo {
  name: string;
  tagline: {
    en: string;
    ar: string;
  };
  founded: number;
  location: string;
  email: string;
  phone: string;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Hero Section Types
export interface HeroContent {
  headline: {
    en: string;
    ar: string;
  };
  subheading: {
    en: string;
    ar: string;
  };
  primaryCTA: {
    en: string;
    ar: string;
  };
  secondaryCTA: {
    en: string;
    ar: string;
  };
}

// Filter Types
export interface FilterOption {
  value: string;
  label: {
    en: string;
    ar: string;
  };
  count?: number;
}

export interface FilterState {
  category?: string;
  tags?: string[];
  search?: string;
  sort?: 'newest' | 'oldest' | 'name' | 'featured';
}

// Dashboard Types
export interface DashboardStats {
  totalContacts: number;
  totalProjects: number;
  totalBlogPosts: number;
  totalTeamMembers: number;
  recentSubmissions: ContactSubmission[];
  recentProjects: Project[];
}

// Utility Types
export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface WithLocale {
  locale: Locale;
  dir: Direction;
}

// Event Types
export interface FormSubmitEvent {
  type: 'contact' | 'free-trial';
  data: ContactFormData | FreeTrialFormData;
  timestamp: Date;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Theme Types
export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  accent: string;
} 