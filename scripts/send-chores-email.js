const { createClient } = require('redis');
const nodemailer = require('nodemailer');

async function sendChoresEmail() {
  const client = createClient({
    url: `redis://:${process.env.UPSTASH_REDIS_PASSWORD}@${process.env.UPSTASH_REDIS_HOST}:${process.env.UPSTASH_REDIS_PORT}`,
  });

  try {
    await client.connect();

    // Get current week key (Sunday = start of week)
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekKey = weekStart.toISOString().split('T')[0];

    // Fetch chores for both children
    const children = ['Mash\'Allah', 'Nur Islam'];
    const choresSummary = {};
    let totalAllChildren = 0;

    for (const child of children) {
      const choreKey = `asmproductions:chores:${child}:${weekKey}`;
      const choreData = await client.get(choreKey);
      
      let completed = 0;
      if (choreData) {
        const chores = JSON.parse(choreData);
        // Count all completed chores across all days
        Object.values(chores).forEach((dayChores) => {
          Object.values(dayChores).forEach((isCompleted) => {
            if (isCompleted) completed++;
          });
        });
      }

      choresSummary[child] = {
        total: completed,
        amount: `$${completed}.00`,
      };

      totalAllChildren += completed;
    }

    await client.disconnect();

    // Format email body
    const emailBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          h2 { color: #2a2a2a; border-bottom: 2px solid #b8764e; padding-bottom: 0.5rem; }
          h4 { color: #b8764e; }
          .summary { background: #f5f3f0; padding: 1.5rem; border-radius: 4px; margin-bottom: 1.5rem; }
          .child-section { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e8e6e3; }
          .child-section:last-child { border-bottom: none; }
          .total-box { background: #b8764e; color: white; padding: 1rem; text-align: center; border-radius: 4px; font-size: 1.25rem; font-weight: bold; margin-top: 1.5rem; }
        </style>
      </head>
      <body>
        <h2>Weekly Chores Report</h2>
        <p><strong>Week of:</strong> ${weekStart.toLocaleDateString()}</p>
        
        <div class="summary">
          <h3>Summary</h3>
          ${children
            .map(
              (child) => `
            <div class="child-section">
              <h4>${child}</h4>
              <p><strong>Chores Completed This Week:</strong> ${choresSummary[child].total}</p>
              <p><strong>Amount Earned:</strong> ${choresSummary[child].amount}</p>
            </div>
          `
            )
            .join('')}
        </div>
        
        <div class="total-box">
          Total Allowance Due: $${totalAllChildren}.00
        </div>

        <p style="margin-top: 2rem; font-size: 0.9rem; color: #666;">
          <em>Email sent from ASM Productions Chores Dashboard</em>
        </p>
      </body>
    </html>
    `;

    // Send email via HostGator SMTP
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
      to: 'amin@asmproductions.co',
      subject: `Weekly Chores Report - Week of ${weekStart.toLocaleDateString()}`,
      html: emailBody,
    });

    console.log('Weekly chores email sent successfully');
  } catch (error) {
    console.error('Error sending chores email:', error);
    process.exit(1);
  }
}

sendChoresEmail();
