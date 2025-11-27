<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1AaaDKcaSi1BLN8m3D85V9DUGS7kIDqYo

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in your values (Odoo + SMTP).
3. Start the contact API (creates Odoo leads and sends the email notification): `npm run api`
4. In another terminal, run the web app: `npm run dev`

## Deploy (Firebase Hosting)

1. Build the static site: `npm run build` (outputs to `dist/`).
2. Deploy the built assets: `firebase deploy --only hosting`.
## Contact form email notifications

The contact form posts to `/api/create-lead`, which will create the lead in Odoo and then email the team. Configure these environment variables in `.env`:

- `ODOO_URL`, `ODOO_DB`, `ODOO_LOGIN`, `ODOO_API_KEY`: Odoo credentials.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`: SMTP server settings.
- `MAIL_FROM`: From address for the notification email (e.g., `"Cross The Bridge <no-reply@yourdomain.com>"`).
- `MAIL_TO`: Destination inbox for new contact alerts.
