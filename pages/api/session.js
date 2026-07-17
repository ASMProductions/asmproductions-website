export default function handler(req, res) {
  const { asmproductions_session } = req.cookies;

  if (!asmproductions_session) {
    return res.status(200).json({ valid: false, email: null });
  }

  // Validate against known access codes or stored sessions
  const validSessions = ['chores-access-mash', 'chores-access-nur'];

  const isValid = validSessions.includes(asmproductions_session);

  if (isValid) {
    return res.status(200).json({ valid: true, email: asmproductions_session });
  }

  return res.status(200).json({ valid: false, email: null });
}
