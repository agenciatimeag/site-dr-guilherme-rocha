// POST /api/capi  → envia o evento LeadQualificado para a API de Conversões do Meta (lado do servidor).
// Chamado pela página /obrigado com o mesmo event_id do Pixel, para o Meta contar uma vez só.
// O token fica na variável de ambiente META_CAPI_TOKEN (Vercel). Nada de dado pessoal em texto: nome e telefone chegam já criptografados (SHA-256).
const { body, send } = require('./lib-http');

const PIXEL_ID = '667194305437913';
const EVENT_NAME = 'LeadQualificado';
const HASH = /^[a-f0-9]{64}$/;

function cookie(req, name) {
  const m = (req.headers.cookie || '').match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'Método não permitido' });
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return send(res, 500, { error: 'META_CAPI_TOKEN não configurado' });

  // só aceita chamadas vindas do próprio site
  const ref = req.headers.origin || req.headers.referer || '';
  if (!/^https:\/\/(www\.)?drguilhermerocha\.com\.br/.test(ref)) return send(res, 403, { error: 'Origem não permitida' });

  let b = {};
  try { b = await body(req); } catch (e) { b = {}; }
  const eventId = String(b.event_id || '').slice(0, 80);
  if (!eventId) return send(res, 400, { error: 'event_id obrigatório' });

  const user = {
    client_ip_address: String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined,
    client_user_agent: req.headers['user-agent'] || undefined,
    fbp: cookie(req, '_fbp'),
    fbc: cookie(req, '_fbc') || (b.fbclid ? `fb.1.${Date.now()}.${String(b.fbclid).slice(0, 500)}` : undefined),
  };
  if (HASH.test(b.ph || '')) user.ph = [b.ph];
  if (HASH.test(b.fn || '')) user.fn = [b.fn];
  user.country = ['885036a0da3dff3c3e05bc79bf49382b12bc5098514ed57ce0875aba1aa2c40d']; // "br" em SHA-256

  const payload = {
    data: [{
      event_name: EVENT_NAME,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: 'website',
      event_source_url: String(b.url || 'https://www.drguilhermerocha.com.br/obrigado').slice(0, 500),
      user_data: user,
    }],
  };
  // modo teste: só quando a página é aberta com ?teste=1 e existe META_TEST_CODE
  if (b.test && process.env.META_TEST_CODE) payload.test_event_code = process.env.META_TEST_CODE;

  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => ({}));
    console.log('[capi]', EVENT_NAME, eventId, r.status, JSON.stringify(j).slice(0, 300), payload.test_event_code ? '(teste)' : '');
    return send(res, r.ok ? 200 : 502, { ok: r.ok, events_received: j.events_received, error: j.error && j.error.message });
  } catch (e) {
    console.log('[capi] falha', e.message);
    return send(res, 502, { ok: false });
  }
};
