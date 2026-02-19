# Email Setup with Resend & Express Server

The contact form uses Resend to send emails via an Express server backend.

## Local Development

1. **Start the email server:**
```bash
npm run api
```
Server runs on `http://localhost:3000`

2. **Start the frontend (in another terminal):**
```bash
npm run dev
```

3. **Test the contact form** in your local browser.

## Production Deployment

Your setup:
- **Frontend:** Firebase Hosting (static)
- **Backend:** Express server (needs separate hosting)

### Option 1: Deploy to Railway.app (Recommended - Easiest)

1. Sign up at https://railway.app (free with GitHub login)
2. Create a new project and connect this repository
3. Set the start command:
   ```
   npm run api
   ```
4. Set environment variable in Railway dashboard:
   - `RESEND_API_KEY` = your Resend API key
5. Railway gives you a URL (e.g., `https://your-app.railway.app`)
6. Update `App.tsx` to use the production URL:

**In App.tsx, find the `handleContactSubmit` function and update the fetch call:**

```typescript
const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.railway.app/api/send-email'  // Replace with your Railway URL
  : 'http://localhost:3000/api/send-email';

const resp = await fetch(apiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(contactForm),
});
```

Or use an environment variable approach:
- Create `.env.production` with `VITE_API_URL=https://your-app.railway.app`
- In App.tsx: Use `import.meta.env.VITE_API_URL` 

### Option 2: Render.com (Also Free)

https://render.com - Deploy web services for FREE (deployment takes ~2min)

Same steps as Railway - connect repo, set environment variables, deploy.

### Option 3: Firebase Blaze Plan

Upgrade Firebase project to Blaze plan ($0 + usage, first $50/month free):
- Enables Cloud Functions, Secrets API  
- Can host backend on same project
- Most integrated but requires credit card

## Current Status

✅ Email sending works locally (tested)
✅ Express server running on port 3000
✅ Resend API key configured in `.env`

## Next Steps

1. Choose a hosting platform above (Railway/Render recommended)
2. Deploy the Express server
3. Update `App.tsx` with the production API URL
4. Deploy frontend to Firebase Hosting

## API Endpoint

- **Local:** `http://localhost:3000/api/send-email`
- **Production:** `https://your-deployment.railway.app/api/send-email`

**Required fields:** `name`, `email`, `company`
**Optional fields:** `website`, `serviceInterest`, `message`
