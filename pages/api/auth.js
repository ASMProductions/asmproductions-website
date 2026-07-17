export default function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    // Valid access codes for chores dashboard
    const validCodes = {
      'MASH': 'chores-access-mash',
      'NUR': 'chores-access-nur',
      'ADMIN': 'chores-access-admin',
    };

    if (!code || !validCodes[code.toUpperCase()]) {
      return res.status(401).json({ success: false, message: 'Invalid code' });
    }

    const sessionValue = validCodes[code.toUpperCase()];

    // Set 30-day HttpOnly cookie
    res.setHeader('Set-Cookie', `asmproductions_session=${sessionValue}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Strict`);

    return res.status(200).json({ success: true, message: 'Access granted' });
  }

  if (req.method === 'GET') {
    // Logout
    res.setHeader('Set-Cookie', 'asmproductions_session=; Path=/; Max-Age=0; HttpOnly');
    return res.status(200).json({ success: true, message: 'Logged out' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
