# Email Setup Guide for Contact Forms

When someone fills out and submits the contact form on your website, they will automatically receive a confirmation email, and you'll receive an alert with their information.

## Quick Start

### 1. Install Dependencies
If you haven't already, install the required packages:
```bash
npm install
```

### 2. Configure Email Provider

Choose an email service provider and get SMTP credentials. Here are popular options:

#### **SendGrid (Recommended - Free tier available)**
1. Sign up at https://sendgrid.com/
2. Go to Settings → API Keys
3. Create a new API key
4. In your `.env` file:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASS=SG.xxxxxxxxxxxxx  # Your SendGrid API key
   ```

#### **Gmail (using App Password)**
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. In your `.env` file:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  # Your 16-character App Password
   ```

#### **Other Providers**
- **Mailgun**: `smtp.mailgun.org:587`
- **Zoho Mail**: `smtp.zoho.com:587`
- **Outlook/Hotmail**: `smtp.outlook.com:587`

Check your provider's documentation for exact SMTP details.

### 3. Update Environment Variables

Edit your `.env` file and update:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=your-smtp-port
SMTP_USER=your-email-or-username
SMTP_PASS=your-password-or-api-key
MAIL_FROM="Cross The Bridge <no-reply@yourdomain.com>"
MAIL_TO=your-email@example.com  # Where you want alerts
```

### 4. Run the Email Server

In one terminal, start the API server:
```bash
npm run api
```

You should see: `Server running on http://localhost:8787`

### 5. Run the Web App

In another terminal, start the Vite dev server:
```bash
npm run dev
```

### 6. Test It

1. Open your app in the browser
2. Navigate to the contact form
3. Fill it out and submit
4. Check:
   - Your email inbox (you should get the contact details)
   - Spam/Junk folder (in case it goes there)
   - Contact's email for confirmation message

## What Happens When Form is Submitted

1. **Validation**: Form checks that name, email, and company are provided
2. **Admin Notification**: An email is sent to `MAIL_TO` with:
   - Contact's name, email, company
   - Website and service interest (if provided)
   - Message content
   - Timestamp
   - Reply-To set to contact's email for easy responses

3. **User Confirmation**: Contact receives an email confirming their submission

## Troubleshooting

### "Failed to send email"
- Check that `.env` file has correct SMTP credentials
- Verify `MAIL_TO` is a valid email address
- Check console logs in server terminal for detailed error

### Emails going to Spam
- Add your `MAIL_FROM` email to contacts
- Update `MAIL_FROM` to be from your domain (e.g., `noreply@yoursite.com`)
- Some providers may flag auto-generated emails

### Port Already in Use
If port 8787 is busy, change in `.env`:
```env
PORT=3001  # or another available port
```

### SMTP Connection Issues
- Verify SMTP_HOST and SMTP_PORT are correct
- Some SMTP servers block connections - check your provider's firewall/IP whitelist
- Try with `SMTP_SECURE=true` and port `465` if `587` doesn't work

## For Production Deployment

When deploying to production (Firebase, Vercel, etc.):

1. **Environment Variables**: Set the same `.env` variables in your hosting provider's environment configuration
2. **Server Deployment**: Deploy the backend (server.js) on a Node.js hosting service:
   - Heroku (free tier available)
   - Railway
   - Render
   - AWS Lambda + API Gateway
   - Vercel Functions
   - Google Cloud Functions

3. **Update API URL**: If backend is on different domain, update the fetch URL in App.tsx:
   ```tsx
   // Change from:
   const resp = await fetch('/api/create-lead', {
   
   // To:
   const resp = await fetch('https://your-backend-url.com/api/create-lead', {
   ```

## Additional Features

You can customize email templates by editing `server.js`:
- Modify `emailHtml` for admin notification styling
- Add company branding/logos
- Change subject line format
- Add additional fields to capture

## Support

For SMTP provider issues, check their documentation:
- SendGrid: https://sendgrid.com/docs/
- Gmail: https://support.google.com/mail
- Other: [Your provider's documentation]
