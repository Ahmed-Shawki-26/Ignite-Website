# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for automatic contact form data export.

## 🎯 What This Does

- **Real-time sync**: Every contact form submission automatically adds a new row to Google Sheets
- **Two separate sheets**: 
  - "Contact Submissions" - for general contact forms
  - "Free Trial Requests" - for free trial requests
- **Team access**: Your entire team can view and manage the data
- **Automatic formatting**: Clean, organized data with timestamps

## 📋 Prerequisites

- Google account
- Basic knowledge of Google Cloud Console

## 🚀 Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "Ignite Marketing Website"
4. Click "Create"

### Step 2: Enable Google Sheets API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### Step 3: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in the details:
   - **Name**: `ignite-website-sheets`
   - **Description**: `Service account for website contact forms`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### Step 4: Generate Service Account Key

1. Click on your service account name
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" (this downloads a JSON file)
6. **Keep this file secure!** It contains your private key

### Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Ignite Marketing - Contact Forms"
4. Create two sheets:
   - **Sheet 1**: "Contact Submissions"
   - **Sheet 2**: "Free Trial Requests"

### Step 6: Share Sheet with Service Account

1. In your Google Sheet, click "Share"
2. Add your service account email (from the JSON file)
3. Give it "Editor" permissions
4. Click "Send"

### Step 7: Configure Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Google Sheets Integration
GOOGLE_SHEET_ID=your-sheet-id-from-url
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_ID=your-client-id-from-json
GOOGLE_SHEET_RANGE=Contact Submissions!A:K
GOOGLE_FREE_TRIAL_RANGE=Free Trial Requests!A:G
```

### Step 8: Get Your Sheet ID

1. Open your Google Sheet
2. Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
3. Replace `your-sheet-id-from-url` with the actual ID

### Step 9: Extract Service Account Details

From your downloaded JSON file, extract:

```json
{
  "client_email": "your-service-account@project.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_id": "your-client-id"
}
```

## 📊 Data Structure

### Contact Submissions Sheet
| Column | Description |
|--------|-------------|
| A | Timestamp |
| B | Name |
| C | Email |
| D | Phone |
| E | Company |
| F | Service |
| G | Budget |
| H | Message |
| I | Language |
| J | Status |
| K | Type |

### Free Trial Requests Sheet
| Column | Description |
|--------|-------------|
| A | Timestamp |
| B | Name |
| C | Email |
| D | Service |
| E | Description |
| F | Language |
| G | Status |

## 🔧 Testing the Integration

1. Start your development server: `npm run dev`
2. Go to `/contact` page
3. Fill out and submit a form
4. Check your Google Sheet - a new row should appear instantly!

## 🛠️ Troubleshooting

### Common Issues:

**"Invalid private key" error:**
- Make sure the private key is properly formatted with `\n` characters
- Copy the exact key from the JSON file

**"Sheet not found" error:**
- Verify the sheet ID is correct
- Make sure the service account has access to the sheet

**"Permission denied" error:**
- Check that the service account email has "Editor" permissions
- Verify the Google Sheets API is enabled

### Debug Mode:

Add this to your `.env.local` for debugging:
```env
DEBUG_GOOGLE_SHEETS=true
```

## 🔒 Security Notes

- **Never commit** your `.env.local` file to git
- **Keep your service account JSON file** secure
- **Use environment variables** in production
- **Regularly rotate** your service account keys

## 📱 Team Access

To give your team access to the Google Sheet:

1. Open the sheet
2. Click "Share"
3. Add team member emails
4. Choose appropriate permissions:
   - **Viewer**: Can only view data
   - **Commenter**: Can view and add comments
   - **Editor**: Can view and edit data

## 🎉 You're Done!

Your contact forms will now automatically sync to Google Sheets. Your team can:

- ✅ View all submissions in real-time
- ✅ Filter and sort data
- ✅ Export to CSV/Excel
- ✅ Set up notifications
- ✅ Collaborate on responses

## 📞 Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Test with a simple form submission
4. Check Google Cloud Console for API usage

---

**Next Steps:**
- Set up email notifications
- Configure team access permissions
- Create custom filters and views
- Set up automated responses 