import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ContactSubmission } from '@/lib/mongodb';
import { addContactToSheet } from '@/lib/google-sheets';
import { z } from 'zod';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.literal('contact'),
  language: z.enum(['en', 'ar']),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Connect to database
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.warn('Database connection failed, continuing without DB:', dbError);
      // Continue without database for development
    }

    // Create contact submission
    const contactSubmission = new ContactSubmission({
      type: validatedData.type,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company || '',
      service: validatedData.service,
      budget: validatedData.budget || '',
      message: validatedData.message,
      language: validatedData.language,
      status: 'new',
    });

    // Save to MongoDB
    await contactSubmission.save();

    // Add to Google Sheets (if configured)
    if (process.env.GOOGLE_SHEET_ID) {
      try {
        await addContactToSheet(contactSubmission);
      } catch (sheetsError) {
        console.error('Google Sheets error:', sheetsError);
        // Don't fail the request if Google Sheets fails
      }
    }

    // Send email notification (if configured)
    if (process.env.SMTP_HOST && process.env.ADMIN_EMAIL) {
      try {
        await sendEmailNotification(contactSubmission);
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: contactSubmission._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);

        if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error', 
          errors: error.issues
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Email notification function
async function sendEmailNotification(submission: {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  language: string;
  message: string;
}) {
  const nodemailer = await import('nodemailer');

  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } as any);

  const emailContent = `
    New Contact Form Submission
    
    Name: ${submission.name}
    Email: ${submission.email}
    Phone: ${submission.phone}
    Company: ${submission.company || 'N/A'}
    Service: ${submission.service}
    Budget: ${submission.budget || 'N/A'}
    Language: ${submission.language}
    
    Message:
    ${submission.message}
    
    Submitted at: ${new Date().toLocaleString()}
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission - ${submission.name}`,
    text: emailContent,
    html: emailContent.replace(/\n/g, '<br>'),
  });
} 