import { randomBytes, scrypt as scryptCb, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { query } from './db.js';
import { parseCookies, setCookie, httpError } from './http.js';

const scrypt = promisify(scryptCb);
const COOKIE = 'inmo_session';
const SESSION_DAYS = 30;

export const MIN_PASSWORD_LENGTH = 6;

export const hashPassword = async (password) => {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;
};

export const verifyPassword = async (password, stored) => {
  if (!stored) return false;
  const [scheme, salt, hash] = stored.split('$');
  if (scheme !== 'scrypt') return false;
  const expected = Buffer.from(hash, 'base64');
  const actual = await scrypt(password, Buffer.from(salt, 'base64'), expected.length);
  return timingSafeEqual(actual, expected);
};

const sha256 = (s) => createHash('sha256').update(s).digest('hex');

export const createSession = async (req, res, userId) => {
  const token = randomBytes(32).toString('base64url');
  await query(
    `INSERT INTO sessions (token_hash, user_id, expires_at) VALUES ($1, $2, now() + interval '${SESSION_DAYS} days')`,
    [sha256(token), userId]
  );
  // Limpieza oportunista de sesiones vencidas
  await query('DELETE FROM sessions WHERE expires_at < now()');
  setCookie(req, res, COOKIE, token, SESSION_DAYS * 86400);
};

export const destroySession = async (req, res) => {
  const token = parseCookies(req)[COOKIE];
  if (token) await query('DELETE FROM sessions WHERE token_hash = $1', [sha256(token)]);
  setCookie(req, res, COOKIE, '', 0);
};

// Usuario de la sesión actual, o null
export const getSessionUser = async (req) => {
  const token = parseCookies(req)[COOKIE];
  if (!token) return null;
  const { rows } = await query(
    `SELECT u.id, u.username, u.role, u.name
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [sha256(token)]
  );
  return rows[0] || null;
};

export const requireUser = async (req) => {
  const user = await getSessionUser(req);
  if (!user) throw httpError(401, 'Sesión no iniciada o vencida');
  return user;
};

export const requireAdmin = async (req) => {
  const user = await requireUser(req);
  if (user.role !== 'admin') throw httpError(403, 'Solo la administración puede hacer esto');
  return user;
};
