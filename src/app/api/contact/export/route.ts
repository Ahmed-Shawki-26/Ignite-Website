import { NextRequest, NextResponse } from 'next/server';
import { exportToCSV } from '@/lib/google-sheets';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'contact' | 'free-trial' | 'all' | null;
    
    if (!process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Google Sheets not configured' 
        },
        { status: 500 }
      );
    }

    const exportType = type || 'all';
    const result = await exportToCSV(exportType);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: result.error || 'Failed to export data' 
        },
        { status: 500 }
      );
    }

    // Return CSV data with proper headers
    const filename = `ignite-submissions-${exportType}-${new Date().toISOString().split('T')[0]}.csv`;
    
    return new NextResponse(result.data, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 