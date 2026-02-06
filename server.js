import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create lead endpoint
app.post('/api/create-lead', async (req, res) => {
  try {
    const { name, email, company, website, serviceInterest, message } = req.body;

    // Validate required fields
    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Missing required fields: name, email, company' });
    }

    // Prepare email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Website:</strong> ${website ? escapeHtml(website) : 'Not provided'}</p>
      <p><strong>Service of Interest:</strong> ${serviceInterest ? escapeHtml(serviceInterest) : 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message ? escapeHtml(message).replace(/\n/g, '<br>') : 'No message provided'}</p>
      <hr>
      <p><small>This message was sent from your contact form at ${new Date().toLocaleString()}</small></p>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company}
Website: ${website || 'Not provided'}
Service of Interest: ${serviceInterest || 'Not specified'}
Message: ${message || 'No message provided'}

---
This message was sent from your contact form at ${new Date().toLocaleString()}
    `;

    // Send email to admin
    const mailOptions = {
      from: process.env.MAIL_FROM || 'no-reply@crossthebridge.com.mx',
      to: process.env.MAIL_TO || 'info@crossthebridge.co',
      subject: `New Contact: ${name} from ${company}`,
      text: emailText,
      html: emailHtml,
      replyTo: email, // Allow easy reply to the contact
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationOptions = {
      from: process.env.MAIL_FROM || 'no-reply@crossthebridge.com.mx',
      to: email,
      subject: 'We received your message - Cross The Bridge',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to explore our services at <a href="https://crossthebridge.co">crossthebridge.co</a></p>
        <p>Best regards,<br>The Cross The Bridge Team</p>
      `,
      text: `Thank you for reaching out!\n\nHi ${name},\n\nWe've received your message and will get back to you as soon as possible.\n\nIn the meantime, feel free to explore our services at https://crossthebridge.co\n\nBest regards,\nThe Cross The Bridge Team`,
    };

    await transporter.sendMail(confirmationOptions);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
});

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Email notifications enabled');
  console.log(`Sending emails to: ${process.env.MAIL_TO}`);
});
