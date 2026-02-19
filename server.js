import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3001;

const resend = new Resend(process.env.RESEND_API_KEY);

// Enable CORS for all origins (needed for cross-domain requests)
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// CORS preflight
app.options('*', cors());

app.post('/api/send-email', async (req, res) => {
  try {
    console.log('[sendEmail] Received request:', { name: req.body?.name, email: req.body?.email, company: req.body?.company });
    const { name, email, company, website, serviceInterest, message } = req.body;

    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Missing required fields: name, email, company' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Send notification to Mariana
    console.log('[sendEmail] Sending notifications...');
    await resend.emails.send({
      from: 'suscripciones@crossthebridge.com',
      to: 'mariana@crossthebridge.com.mx',
      subject: `New Contact: ${name} from ${company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Website:</strong> ${website || 'Not provided'}</p>
        <p><strong>Service of Interest:</strong> ${serviceInterest || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No message provided'}</p>
      `
    });
    console.log('[sendEmail] Notification sent to admin');

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'suscripciones@crossthebridge.com',
      to: email,
      subject: 'We received your message - Cross The Bridge',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to explore our services at <a href="https://crossthebridge.com.mx">crossthebridge.com.mx</a></p>
        <p>Best regards,<br>The Cross The Bridge Team</p>
      `
    });
    console.log('[sendEmail] Confirmation sent to user');

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});
