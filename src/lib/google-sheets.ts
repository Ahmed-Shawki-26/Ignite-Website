import { google } from 'googleapis';
import { ContactSubmission } from '@/types';

// Google Sheets API configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Initialize Google Sheets API
function getGoogleSheetsAuth() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
  });
  return auth;
}

// Add contact submission to Google Sheets
export async function addContactToSheet(submission: ContactSubmission) {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = process.env.GOOGLE_SHEET_RANGE || 'Contact Submissions!A:K';
    
    // Format data for Google Sheets
    const rowData = [
      new Date().toISOString(), // Timestamp
      submission.name,
      submission.email,
      submission.phone,
      submission.company || '',
      submission.service,
      submission.budget || '',
      submission.message,
      submission.language,
      submission.status,
      submission.type
    ];

    // Append data to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Data added to Google Sheets:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding to Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Add free trial request to Google Sheets
export async function addFreeTrialToSheet(submission: ContactSubmission) {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = process.env.GOOGLE_FREE_TRIAL_RANGE || 'Free Trial Requests!A:G';
    
    // Format data for Google Sheets
    const rowData = [
      new Date().toISOString(), // Timestamp
      submission.name,
      submission.email,
      submission.service,
      submission.message,
      submission.language,
      submission.status
    ];

    // Append data to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Free trial data added to Google Sheets:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding free trial to Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Initialize Google Sheets with headers
export async function initializeGoogleSheets() {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    // Contact Submissions headers
    const contactHeaders = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Service',
      'Budget',
      'Message',
      'Language',
      'Status',
      'Type'
    ];

    // Free Trial Requests headers
    const freeTrialHeaders = [
      'Timestamp',
      'Name',
      'Email',
      'Service',
      'Description',
      'Language',
      'Status'
    ];

    // Set headers for Contact Submissions sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Contact Submissions!A1:K1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [contactHeaders],
      },
    });

    // Set headers for Free Trial Requests sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Free Trial Requests!A1:G1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [freeTrialHeaders],
      },
    });

    console.log('Google Sheets initialized with headers');
    return { success: true };
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
} 

// Get all contact submissions from Google Sheets
export async function getContactSubmissions() {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = process.env.GOOGLE_SHEET_RANGE || 'Contact Submissions!A:K';
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return { success: true, data: [] };
    }

    // Skip header row and parse data
    const submissions = rows.slice(1).map((row, index) => ({
      id: index + 1,
      timestamp: row[0] || '',
      name: row[1] || '',
      email: row[2] || '',
      phone: row[3] || '',
      company: row[4] || '',
      service: row[5] || '',
      budget: row[6] || '',
      message: row[7] || '',
      language: row[8] || '',
      status: row[9] || 'new',
      type: row[10] || 'contact',
    }));

    return { success: true, data: submissions };
  } catch (error) {
    console.error('Error reading from Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get all free trial requests from Google Sheets
export async function getFreeTrialRequests() {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = process.env.GOOGLE_FREE_TRIAL_RANGE || 'Free Trial Requests!A:G';
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return { success: true, data: [] };
    }

    // Skip header row and parse data
    const requests = rows.slice(1).map((row, index) => ({
      id: index + 1,
      timestamp: row[0] || '',
      name: row[1] || '',
      email: row[2] || '',
      service: row[3] || '',
      description: row[4] || '',
      language: row[5] || '',
      status: row[6] || 'new',
    }));

    return { success: true, data: requests };
  } catch (error) {
    console.error('Error reading free trial requests from Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Update submission status in Google Sheets
export async function updateSubmissionStatus(
  type: 'contact' | 'free-trial',
  rowIndex: number,
  status: 'new' | 'contacted' | 'converted' | 'closed'
) {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = type === 'contact' 
      ? `Contact Submissions!J${rowIndex + 2}` // +2 because sheets are 1-indexed and we skip header
      : `Free Trial Requests!G${rowIndex + 2}`;
    
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[status]],
      },
    });

    console.log('Status updated in Google Sheets:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating status in Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get statistics from Google Sheets
export async function getGoogleSheetsStats() {
  try {
    const [contactResult, freeTrialResult] = await Promise.all([
      getContactSubmissions(),
      getFreeTrialRequests()
    ]);

    if (!contactResult.success || !freeTrialResult.success) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const contactSubmissions = contactResult.data || [];
    const freeTrialRequests = freeTrialResult.data || [];

    // Calculate statistics
    const stats = {
      totalContacts: contactSubmissions.length,
      totalFreeTrials: freeTrialRequests.length,
      totalSubmissions: contactSubmissions.length + freeTrialRequests.length,
      statusBreakdown: {
        new: 0,
        contacted: 0,
        converted: 0,
        closed: 0,
      },
      recentSubmissions: [
        ...contactSubmissions.slice(-5).reverse(),
        ...freeTrialRequests.slice(-5).reverse()
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10),
      serviceBreakdown: {} as Record<string, number>,
    };

    // Count statuses
    [...contactSubmissions, ...freeTrialRequests].forEach(submission => {
      const status = submission.status || 'new';
      stats.statusBreakdown[status as keyof typeof stats.statusBreakdown]++;
      
      const service = submission.service || 'Unknown';
      stats.serviceBreakdown[service] = (stats.serviceBreakdown[service] || 0) + 1;
    });

    return { success: true, data: stats };
  } catch (error) {
    console.error('Error getting Google Sheets statistics:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Export data to CSV format
export async function exportToCSV(type: 'contact' | 'free-trial' | 'all') {
  try {
    let data: any[] = [];
    
    if (type === 'contact' || type === 'all') {
      const contactResult = await getContactSubmissions();
      if (contactResult.success && contactResult.data) {
        data = [...data, ...contactResult.data];
      }
    }
    
    if (type === 'free-trial' || type === 'all') {
      const freeTrialResult = await getFreeTrialRequests();
      if (freeTrialResult.success && freeTrialResult.data) {
        data = [...data, ...freeTrialResult.data];
      }
    }

    if (data.length === 0) {
      return { success: false, error: 'No data to export' };
    }

    // Convert to CSV format
    const headers = Object.keys(data[0]).join(',');
    const csvRows = data.map(row => 
      Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(',')
    );
    
    const csv = [headers, ...csvRows].join('\n');
    
    return { success: true, data: csv };
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
} 