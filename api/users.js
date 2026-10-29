import { query } from './_lib/db.js';
import { send, readJson, handle, httpError, parseCookies } from './_lib/http.js';
import { requireAdmin, hashPassword, MIN_PASSWORD_LENGTH } from './_lib/auth.js';
import { createHash } from 'node:crypto';

// POST /api/users -> { target: 'admin' | <id del agente>, username, name?, password? }
// Solo la administración. Crea o actualiza el acceso; la contraseña vacía deja la actual.
export default handle(async (req, res) => {
  if (req.method !== 'POST') throw httpError(405, 'Método no permitido');
  const admin = await requireAdmin(req);
  const { target, username = '', name, password = '' } = await readJson(req);

  const cleanUsername = String(username).trim();
  if (!/^[A-Za-z0-9._-]{3,40}$/.test(cleanUsername)) {
    throw httpError(400, 'El usuario debe tener entre 3 y 40 caracteres (letras, números, punto, guion)');
  }
  if (password && String(password).length < MIN_PASSWORD_LENGTH) {
    throw httpError(400, `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
  }

  const taken = await query('SELECT id FROM users WHERE lower(username) = lower($1)', [cleanUsername]);
  const userId = target === 'admin' ? admin.id : String(target || '');
  if (taken.rows.some(r => r.id !== userId)) throw httpError(409, `El usuario "${cleanUsername}" ya está en uso`);

  const passwordHash = password ? await hashPassword(String(password)) : null;

  if (target === 'admin') {
    await query(
      `UPDATE users SET username = $1, name = COALESCE($2, name), password_hash = COALESCE($3, password_hash) WHERE id = $4`,
      [cleanUsername, name ?? null, passwordHash, admin.id]
    );
  } else {
    const agent = await query(`SELECT data FROM records WHERE collection = 'agents' AND id = $1`, [userId]);
    if (!agent.rows[0] || agent.rows[0].data.isOwner) throw httpError(404, 'Broker no encontrado');
    await query(
      `INSERT INTO users (id, username, password_hash, role, name) VALUES ($1, $2, $3, 'broker', $4)
       ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, name = EXCLUDED.name,
         password_hash = COALESCE(EXCLUDED.password_hash, users.password_hash)`,
      [userId, cleanUsername, passwordHash, agent.rows[0].data.name]
    );
  }

  // Al cambiar la contraseña se cierran las demás sesiones de esa cuenta
  if (passwordHash) {
    const current = parseCookies(req).inmo_session;
    const currentHash = current ? createHash('sha256').update(current).digest('hex') : '';
    await query('DELETE FROM sessions WHERE user_id = $1 AND token_hash <> $2', [userId, currentHash]);
  }

  const { rows } = await query('SELECT username, password_hash IS NOT NULL AS has_password FROM users WHERE id = $1', [userId]);
  send(res, 200, { ok: true, username: rows[0]?.username, hasPassword: rows[0]?.has_password ?? false });
});
