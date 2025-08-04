import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ContactSubmission } from '@/lib/mongodb';
import { addFreeTrialToSheet } from '@/lib/google-sheets';
import { z } from 'zod';

// Validation schema for free trial form
const freeTrialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.literal('free-trial'),
  language: z.enum(['en', 'ar']),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = freeTrialSchema.parse(body);

    // Connect to database
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.warn('Database connection failed, continuing without DB:', dbError);
      // Continue without database for development
    }

    // Create free trial submission
    const freeTrialSubmission = new ContactSubmission({
      type: validatedData.type,
      name: validatedData.name,
      email: validatedData.email,
      phone: 'N/A', // Not required for free trial but DB requires it
      company: 'N/A', // Not required for free trial but DB requires it
      service: validatedData.service,
      budget: 'N/A', // Not required for free trial but DB requires it
      message: validatedData.message,
      language: validatedData.language,
      status: 'new',
    });

    // Save to MongoDB
    await freeTrialSubmission.save();

    // Add to Google Sheets (if configured)
    if (process.env.GOOGLE_SHEET_ID) {
      try {
        await addFreeTrialToSheet(freeTrialSubmission);
      } catch (sheetsError) {
        console.error('Google Sheets error:', sheetsError);
        // Don't fail the request if Google Sheets fails
      }
    }

    // Send email notification (if configured)
    if (process.env.SMTP_HOST && process.env.ADMIN_EMAIL) {
      try {
        await sendFreeTrialEmailNotification(freeTrialSubmission);
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Free trial request submitted successfully',
        id: freeTrialSubmission._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Free trial form submission error:', error);

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

// Email notification function for free trial
async function sendFreeTrialEmailNotification(submission: {
  name: string;
  email: string;
  service: string;
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
    New Free Trial Request
    
    Name: ${submission.name}
    Email: ${submission.email}
    Service: ${submission.service}
    Language: ${submission.language}
    
    Project Description:
    ${submission.message}
    
    Submitted at: ${new Date().toLocaleString()}
    
    This is a free trial request - please follow up within 24 hours!
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `🚀 New Free Trial Request - ${submission.name} (${submission.service})`,
    text: emailContent,
    html: emailContent.replace(/\n/g, '<br>'),
  });
} 