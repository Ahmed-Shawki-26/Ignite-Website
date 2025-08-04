import { NextRequest, NextResponse } from 'next/server';
import { initializeGoogleSheets, getGoogleSheetsStats } from '@/lib/google-sheets';

export async function GET(request: NextRequest) {
  try {
    // Check if Google Sheets is configured
    if (!process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json({
        success: false,
        message: 'Google Sheets not configured',
        missingEnvVars: [
          !process.env.GOOGLE_SHEET_ID && 'GOOGLE_SHEET_ID',
          !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
          !process.env.GOOGLE_PRIVATE_KEY && 'GOOGLE_PRIVATE_KEY',
          !process.env.GOOGLE_CLIENT_ID && 'GOOGLE_CLIENT_ID',
        ].filter(Boolean)
      });
    }

    // Test Google Sheets connection
    const initResult = await initializeGoogleSheets();
    
    if (!initResult.success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to initialize Google Sheets',
        error: initResult.error
      });
    }

    // Test reading data
    const statsResult = await getGoogleSheetsStats();
    
    if (!statsResult.success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to read from Google Sheets',
        error: statsResult.error
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Google Sheets integration is working correctly',
      data: {
        totalSubmissions: statsResult.data.totalSubmissions,
        totalContacts: statsResult.data.totalContacts,
        totalFreeTrials: statsResult.data.totalFreeTrials,
        statusBreakdown: statsResult.data.statusBreakdown,
      },
      config: {
        sheetId: process.env.GOOGLE_SHEET_ID,
        serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
        hasClientId: !!process.env.GOOGLE_CLIENT_ID,
      }
    });

  } catch (error) {
    console.error('Google Sheets test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 