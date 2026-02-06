# Email Notifications - Quick Start

## Setup in 3 Steps

### Step 1: Get SMTP Credentials (2 minutes)
Choose an email service:
- **SendGrid** (easiest): https://sendgrid.com/ → Settings → API Keys
- **Gmail**: https://myaccount.google.com/apppasswords (need 2FA enabled)
- **Or any other SMTP provider**

### Step 2: Update `.env` File
```env
SMTP_HOST=smtp.sendgrid.net          # Your provider's SMTP server
SMTP_PORT=587
SMTP_USER=apikey                     # Your username
SMTP_PASS=SG.xxxxx...                # Your password/API key
MAIL_FROM="Cross The Bridge <noreply@yourdomain.com>"
MAIL_TO=your-email@example.com       # Where YOU get alerts
```

### Step 3: Run the Server
```bash
# Terminal 1
npm run api

# Terminal 2 (in another terminal)
npm run dev
```

## Done! ✅
Your contact form will now:
1. ✉️ Send you an email with contact details when someone submits
2. 📧 Send the contact person a confirmation email

## Email Flow
```
User fills form
    ↓
Clicks Submit
    ↓
API validates data
    ↓
Sends TWO emails:
  1. To YOU (admin alert)
  2. To THEM (confirmation)
    ↓
Form clears & success message shown
```

## That's it!
For detailed setup with different providers, see: [EMAIL_SETUP.md](./EMAIL_SETUP.md)
