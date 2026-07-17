import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostgator.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.HOSTGATOR_SMTP_USER,
        pass: process.env.HOSTGATOR_SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: 'noreply@asmproductions.co',
      to: 'contact@asmproductions.co',
      replyTo: email,
      subject: `New message from ${name} via asmproductions.co`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
