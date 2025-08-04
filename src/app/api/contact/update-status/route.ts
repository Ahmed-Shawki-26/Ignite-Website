import { NextRequest, NextResponse } from 'next/server';
import { updateSubmissionStatus } from '@/lib/google-sheets';
import { z } from 'zod';

// Validation schema for status update
const statusUpdateSchema = z.object({
  type: z.enum(['contact', 'free-trial']),
  rowIndex: z.number().min(0),
  status: z.enum(['new', 'contacted', 'converted', 'closed']),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = statusUpdateSchema.parse(body);

    if (!process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Google Sheets not configured' 
        },
        { status: 500 }
      );
    }

    // Update status in Google Sheets
    const result = await updateSubmissionStatus(
      validatedData.type,
      validatedData.rowIndex,
      validatedData.status
    );

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: result.error || 'Failed to update status' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Status updated successfully',
        data: result.data
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Status update error:', error);

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