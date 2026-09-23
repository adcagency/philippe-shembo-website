// api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // Fallback
      }
    }

    const { email, password } = body || {};
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const githubToken = process.env.GITHUB_TOKEN;

    if (!adminEmail || !adminPassword || !githubToken) {
      return res.status(500).json({
        error: 'Configuration serveur incomplète. Veuillez définir ADMIN_EMAIL, ADMIN_PASSWORD et GITHUB_TOKEN dans vos variables Vercel.'
      });
    }

    if (
      email &&
      password &&
      email.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
      password === adminPassword
    ) {
      // Identifiants valides : renvoi de la session pour Sveltia CMS
      return res.status(200).json({
        success: true,
        user: {
          backendName: 'github',
          token: githubToken,
          name: 'Apôtre Philippe Andy Shembo',
          login: 'admin',
          email: adminEmail
        }
      });
    }

    return res.status(401).json({ error: 'Adresse email ou mot de passe incorrect.' });
  } catch (err) {
    console.error('Erreur API Login:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}
