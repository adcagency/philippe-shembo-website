// api/callback.js
export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send('Code is missing from OAuth callback.');
  }

  if (!clientId || !clientSecret) {
    return res.status(500).send('GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is missing.');
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(`GitHub OAuth Error: ${data.error_description || data.error}`);
    }

    const token = data.access_token;
    const provider = 'github';

    // Script d'envoi du message postMessage vers la fenêtre parente Sveltia CMS / Decap CMS
    const responseHtml = `<!doctype html>
<html>
<body>
  <script>
    (function() {
      function send(message) {
        window.opener.postMessage(
          'authorization:${provider}:success:' + JSON.stringify(message),
          window.location.origin
        );
        window.close();
      }
      send({ token: "${token}", provider: "${provider}" });
    })();
  </script>
  <p>Authentification réussie. Fermeture de la fenêtre...</p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(responseHtml);
  } catch (err) {
    console.error('OAuth Callback Error:', err);
    return res.status(500).send(`Internal Server Error: ${err.message}`);
  }
}
