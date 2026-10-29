import { query } from './_lib/db.js';
import { send, getQuery, readJson, handle, httpError } from './_lib/http.js';
import { verifyPassword, createSession, destroySession, getSessionUser } from './_lib/auth.js';
import { buildProfile } from './_lib/profile.js';

// GET  /api/auth?action=me      -> usuario de la sesión
// POST /api/auth?action=login   -> { username, password }
// POST /api/auth?action=logout
export default handle(async (req, res) => {
  const action = getQuery(req).get('action');

  if (req.method === 'GET' && action === 'me') {
    const user = await getSessionUser(req);
    const profile = user ? await buildProfile(user) : null;
    return send(res, 200, { user: profile });
  }

  if (req.method === 'POST' && action === 'login') {
    const { username = '', password = '' } = await readJson(req);
    const { rows } = await query('SELECT * FROM users WHERE lower(username) = lower($1)', [String(username).trim()]);
    const user = rows[0];
    const ok = user && await verifyPassword(String(password), user.password_hash);
    const profile = ok ? await buildProfile(user) : null;
    if (!profile) {
      // Demora fija para frenar intentos repetidos
      await new Promise(r => setTimeout(r, 600));
      throw httpError(401, 'Usuario o contraseña incorrectos.');
    }
    await createSession(req, res, user.id);
    return send(res, 200, { user: profile });
  }

  if (req.method === 'POST' && action === 'logout') {
    await destroySession(req, res);
    return send(res, 200, { ok: true });
  }

  throw httpError(404, 'Acción no encontrada');
});
