import express from 'express';

const app = express();
app.use(express.json());

// Basic CORS for local dev / static hosting behind a proxy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const ODOO_URL = process.env.ODOO_URL || 'https://edu-cross-the-bridge.odoo.com';
const ODOO_DB = process.env.ODOO_DB || 'edu-cross-the-bridge';
const ODOO_LOGIN = process.env.ODOO_LOGIN || '';
const ODOO_API_KEY = process.env.ODOO_API_KEY || '98cbbe562140e016870c4b8352c46196228ec497';

const REQUIRED_FIELDS = ['name', 'email'];

app.post('/api/create-lead', async (req, res) => {
  try {
    if (!ODOO_LOGIN) {
      return res.status(500).json({ error: 'Server missing ODOO_LOGIN env var' });
    }

    const { name, email, company, message } = req.body || {};
    for (const f of REQUIRED_FIELDS) {
      if (!req.body?.[f]) {
        return res.status(400).json({ error: `Missing required field: ${f}` });
      }
    }

    // Step 1: authenticate to get session
    const authResponse = await fetch(`${ODOO_URL}/web/session/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        params: {
          db: ODOO_DB,
          login: ODOO_LOGIN,
          password: ODOO_API_KEY,
        },
      }),
    });

    const setCookie = authResponse.headers.get('set-cookie');
    const authJson = await authResponse.json();
    const uid = authJson?.result?.uid;

    if (!authResponse.ok || !uid || !setCookie) {
      return res.status(500).json({ error: 'Authentication to Odoo failed', details: authJson });
    }

    // Step 2: create lead
    const leadPayload = {
      name: company ? `${company} - ${name}` : name,
      contact_name: name,
      partner_name: company || undefined,
      email_from: email,
      description: message || '',
    };

    const createResponse = await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: setCookie.split(';')[0],
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'crm.lead',
          method: 'create',
          args: [leadPayload],
          kwargs: {},
          context: {},
        },
      }),
    });

    const createJson = await createResponse.json();
    if (!createResponse.ok || createJson?.error) {
      return res.status(500).json({ error: 'Lead creation failed', details: createJson?.error || createJson });
    }

    return res.json({ ok: true, leadId: createJson?.result });
  } catch (err) {
    console.error('Odoo lead creation error', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});
