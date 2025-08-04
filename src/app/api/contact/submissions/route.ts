import { NextRequest, NextResponse } from 'next/server';
import { getContactSubmissions, getFreeTrialRequests, getGoogleSheetsStats } from '@/lib/google-sheets';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'contact' | 'free-trial' | 'stats' | null;
    
    if (!process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Google Sheets not configured' 
        },
        { status: 500 }
      );
    }

    switch (type) {
      case 'contact':
        const contactResult = await getContactSubmissions();
        return NextResponse.json(contactResult);
        
      case 'free-trial':
        const freeTrialResult = await getFreeTrialRequests();
        return NextResponse.json(freeTrialResult);
        
      case 'stats':
        const statsResult = await getGoogleSheetsStats();
        return NextResponse.json(statsResult);
        
      default:
        // Return both contact and free trial submissions
        const [contactData, freeTrialData] = await Promise.all([
          getContactSubmissions(),
          getFreeTrialRequests()
        ]);
        
        return NextResponse.json({
          success: true,
          data: {
            contacts: contactData.data || [],
            freeTrials: freeTrialData.data || [],
            totalContacts: contactData.data?.length || 0,
            totalFreeTrials: freeTrialData.data?.length || 0,
          }
        });
    }

  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
} 