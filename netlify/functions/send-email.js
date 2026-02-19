import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, company, website, serviceInterest, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !company) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields: name, email, company' }) };
    }

    // Send email to admin
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
        `,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Email sent successfully' }) };
  } catch (error) {
    console.error('Error sending email:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Failed to send email' }) };
  }
};