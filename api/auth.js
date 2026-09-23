// api/auth.js
export default function handler(req, res) {
  const { host } = req.headers;
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({ error: 'GITHUB_CLIENT_ID is not configured in environment variables.' });
  }

  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

  res.writeHead(302, { Location: url });
  res.end();
}
