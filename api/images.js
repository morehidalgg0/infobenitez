import { randomBytes } from 'node:crypto';
import { query } from './_lib/db.js';
import { send, getQuery, readJson, handle, httpError } from './_lib/http.js';
import { requireUser } from './_lib/auth.js';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 3 * 1024 * 1024;

// GET  /api/images?id=...  -> la foto (pública, como en los portales; se cachea para siempre)
// POST /api/images         -> { mime, data: base64 } (requiere sesión) -> { url }
export default handle(async (req, res) => {
  if (req.method === 'GET') {
    const id = getQuery(req).get('id') || '';
    if (!/^[A-Za-z0-9_-]{10,64}$/.test(id)) throw httpError(400, 'Foto inválida');
    const { rows } = await query('SELECT mime, bytes FROM images WHERE id = $1', [id]);
    if (!rows[0]) throw httpError(404, 'Foto no encontrada');
    res.statusCode = 200;
    res.setHeader('Content-Type', rows[0].mime);
    // El id no cambia nunca: el navegador y la CDN de Vercel pueden guardarla
    res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
    return res.end(rows[0].bytes);
  }

  if (req.method !== 'POST') throw httpError(405, 'Método no permitido');
  const user = await requireUser(req);
  const { mime, data } = await readJson(req);
  if (!ALLOWED_MIME.includes(mime)) throw httpError(400, 'Formato no soportado (JPG, PNG o WebP)');
  const bytes = Buffer.from(String(data || ''), 'base64');
  if (bytes.length === 0) throw httpError(400, 'La foto está vacía');
  if (bytes.length > MAX_BYTES) throw httpError(413, 'La foto es demasiado grande');

  const id = randomBytes(12).toString('base64url');
  await query('INSERT INTO images (id, mime, bytes, uploaded_by) VALUES ($1, $2, $3, $4)', [id, mime, bytes, user.id]);
  send(res, 200, { url: `/api/images?id=${id}` });
});
