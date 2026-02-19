const functions = require('firebase-functions');
const { Resend } = require('resend');

const key = functions.config && functions.config().resend && functions.config().resend.key;
if (!key) {
  console.warn('RESEND API key not found in functions config. Set it with: firebase functions:config:set resend.key="YOUR_KEY"');
}

const resend = new Resend(key);

exports.sendEmail = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { name, email, company, website, serviceInterest, message } = req.body || {};

    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Missing required fields: name, email, company' });
    }

    if (!key) {
      return res.status(500).json({ error: 'Resend API key not configured on the server' });
    }

    // Send notification to admin
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'info@crossthebridge.co',
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

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'We received your message - Cross The Bridge',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to explore our services at <a href="https://crossthebridge.co">crossthebridge.co</a></p>
        <p>Best regards,<br>The Cross The Bridge Team</p>
      `
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
});
