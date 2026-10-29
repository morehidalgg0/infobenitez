// Helpers que funcionan igual en Vercel y en el middleware de Vite (dev)

export const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

export const getQuery = (req) => new URL(req.url, 'http://localhost').searchParams;

export const readJson = async (req) => {
  // Solo JSON: bloquea envíos de formularios de otros sitios (CSRF)
  if (!String(req.headers['content-type'] || '').includes('application/json')) {
    const err = new Error('Se esperaba JSON');
    err.status = 415;
    throw err;
  }
  if (req.body !== undefined) {
    return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
};

export const parseCookies = (req) =>
  Object.fromEntries(
    String(req.headers.cookie || '')
      .split(';')
      .map(c => c.trim().split('='))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k, decodeURIComponent(v.join('='))])
  );

const isLocal = (req) => /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(req.headers.host || '');

export const setCookie = (req, res, name, value, maxAgeSeconds) => {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`
  ];
  if (!isLocal(req)) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
};

// Envuelve un handler: errores controlados -> JSON con su status
export const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (e) {
    if (e.status) return send(res, e.status, { error: e.message });
    console.error(e);
    send(res, 500, { error: 'Error interno del servidor' });
  }
};

export const httpError = (status, message) => Object.assign(new Error(message), { status });
