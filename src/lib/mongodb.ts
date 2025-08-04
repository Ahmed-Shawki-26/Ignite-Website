import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'MONGODB_URI=mongodb+srv://ignite-admin:<db_password>@cluster0.dnzwjlp.mongodb.net/ignite-website?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not defined - database features will be limited');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = (global as unknown as GlobalWithMongoose).mongoose;

if (!cached) {
  cached = (global as unknown as GlobalWithMongoose).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached?.conn) {
    return cached!.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default dbConnect;
export const connectToDatabase = dbConnect;

// MongoDB Models
import { Schema, model, models } from 'mongoose';

// Page Schema
const PageSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  content: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }]
  },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Project Schema
const ProjectSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  client: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  results: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  technologies: [{ type: String }],
  testimonial: {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Team Member Schema
const TeamMemberSchema = new Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  role: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  bio: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  image: { type: String, required: true },
  email: { type: String, required: true },
  social: {
    linkedin: String,
    twitter: String,
    instagram: String,
    github: String,
    behance: String
  },
  specializations: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Blog Post Schema
const BlogPostSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  content: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  excerpt: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  author: { type: Schema.Types.ObjectId, ref: 'TeamMember', required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  featuredImage: { type: String, required: true },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
  seo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Service Schema
const ServiceSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  icon: { type: String, required: true },
  features: [{
    en: { type: String, required: true },
    ar: { type: String, required: true }
  }],
  pricing: {
    starting: { type: Number, required: true },
    currency: { type: String, required: true }
  },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Contact Submission Schema
const ContactSubmissionSchema = new Schema({
  type: { type: String, enum: ['contact', 'free-trial'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: String,
  service: { type: String, required: true },
  budget: String,
  message: { type: String, required: true },
  language: { type: String, enum: ['en', 'ar'], required: true },
  status: { type: String, enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Site Settings Schema
const SiteSettingsSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  type: { type: String, enum: ['text', 'number', 'boolean', 'array'], required: true },
  category: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

// Export models (use existing models or create new ones)
export const Page = models.Page || model('Page', PageSchema);
export const Project = models.Project || model('Project', ProjectSchema);
export const TeamMember = models.TeamMember || model('TeamMember', TeamMemberSchema);
export const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);
export const Service = models.Service || model('Service', ServiceSchema);
export const ContactSubmission = models.ContactSubmission || model('ContactSubmission', ContactSubmissionSchema);
export const SiteSettings = models.SiteSettings || model('SiteSettings', SiteSettingsSchema); 