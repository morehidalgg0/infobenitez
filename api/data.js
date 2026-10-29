import { query, withTransaction } from './_lib/db.js';
import { send, readJson, handle, httpError } from './_lib/http.js';
import { requireUser } from './_lib/auth.js';
import { buildProfile } from './_lib/profile.js';
import { calcSaleSplit } from '../src/utils/saleSplit.js';

const COLLECTIONS = ['properties', 'agents', 'reservations', 'rentals', 'movements'];

// Orden estable: propiedades más nuevas primero; el resto por nombre o por id (que lleva la fecha de alta)
const ORDER_BY = {
  properties: `data->>'createdAt' DESC NULLS LAST, id`,
  agents: `data->>'name'`,
  reservations: 'id DESC',
  rentals: 'id DESC',
  movements: `data->>'date' DESC, id DESC`
};

const loadCollection = async (collection, ownerId) => {
  const order = ORDER_BY[collection];
  const { rows } = ownerId
    ? await query(`SELECT data FROM records WHERE collection = $1 AND owner_id = $2 ORDER BY ${order}`, [collection, ownerId])
    : await query(`SELECT data FROM records WHERE collection = $1 ORDER BY ${order}`, [collection]);
  return rows.map(r => r.data);
};

// GET  /api/data -> todas las colecciones visibles para el usuario
// POST /api/data -> { collection, upserts: [...], deletes: [ids] }
export default handle(async (req, res) => {
  const user = await requireUser(req);
  const profile = await buildProfile(user);
  if (!profile) throw httpError(403, 'Tu cuenta no tiene acceso');
  const isAdmin = profile.role === 'admin';

  if (req.method === 'GET') {
    const [properties, agents, reservations, rentals, movements] = await Promise.all([
      loadCollection('properties'),
      loadCollection('agents'),
      loadCollection('reservations'),
      loadCollection('rentals'),
      // Cada broker ve solo sus movimientos; la administración ve todos
      loadCollection('movements', isAdmin ? null : user.id)
    ]);

    let accounts = {};
    let admin = null;
    if (isAdmin) {
      const { rows } = await query('SELECT id, username, role, name, password_hash IS NOT NULL AS has_password FROM users');
      accounts = Object.fromEntries(rows.map(r => [r.id, { username: r.username, hasPassword: r.has_password }]));
      const adminRow = rows.find(r => r.role === 'admin');
      admin = adminRow ? { name: adminRow.name, username: adminRow.username } : null;
    }

    return send(res, 200, {
      user: profile,
      admin,
      properties,
      // Usuario y estado de contraseña de cada broker: solo para la administración
      agents: agents.map(a => ({ ...a, ...(accounts[a.id] || { username: '', hasPassword: false }) })),
      reservations,
      rentals,
      movements
    });
  }

  if (req.method !== 'POST') throw httpError(405, 'Método no permitido');

  const { collection, upserts = [], deletes = [] } = await readJson(req);
  if (!COLLECTIONS.includes(collection)) throw httpError(400, 'Colección inválida');
  if (!Array.isArray(upserts) || !Array.isArray(deletes)) throw httpError(400, 'Formato inválido');
  if (collection === 'agents' && !isAdmin) throw httpError(403, 'Solo la administración puede modificar el equipo');

  const validId = (id) => typeof id === 'string' && id.length > 0 && id.length <= 120;
  if (!upserts.every(r => r && typeof r === 'object' && validId(r.id)) || !deletes.every(validId)) {
    throw httpError(400, 'Registros inválidos');
  }

  const saved = await withTransaction(async (db) => {
    const getExisting = async (id) => {
      const { rows } = await db.query('SELECT data, owner_id FROM records WHERE collection = $1 AND id = $2', [collection, id]);
      return rows[0] || null;
    };
    const result = [];

    for (const record of upserts) {
      let data = { ...record };
      let ownerId = null;

      if (collection === 'agents') {
        // Las credenciales viven en la tabla users, nunca en la ficha del agente
        delete data.password;
        delete data.username;
        delete data.hasPassword;
      }

      if (collection === 'movements') {
        const existing = await getExisting(data.id);
        if (isAdmin) {
          ownerId = data.userId || 'admin';
        } else {
          if (existing && existing.owner_id !== user.id) throw httpError(403, 'No podés modificar movimientos de otra persona');
          if (existing?.data.kind === 'venta' && existing.data.agencyShareSettled) {
            throw httpError(403, 'Esta venta ya fue liquidada; pedile a la administración que la modifique');
          }
          ownerId = user.id;
          // El broker no decide el % de la inmobiliaria ni si ya está liquidado
          data = {
            ...data,
            userId: user.id,
            agencyShareSettled: false,
            agencySplitPercent: data.kind === 'venta' ? profile.agencySplitPercent : data.agencySplitPercent
          };
        }
        if (data.kind === 'venta') {
          const split = calcSaleSplit(data.salePrice, data.commissionPercent, data.agencySplitPercent);
          data = { ...data, type: 'ingreso', ...split, amount: split.commissionTotal };
        }
      }

      await db.query(
        `INSERT INTO records (collection, id, data, owner_id, updated_at) VALUES ($1, $2, $3, $4, now())
         ON CONFLICT (collection, id) DO UPDATE SET data = EXCLUDED.data, owner_id = EXCLUDED.owner_id, updated_at = now()`,
        [collection, data.id, data, ownerId]
      );
      result.push(data);
    }

    for (const id of deletes) {
      if (collection === 'movements' && !isAdmin) {
        const existing = await getExisting(id);
        if (!existing) continue;
        if (existing.owner_id !== user.id) throw httpError(403, 'No podés borrar movimientos de otra persona');
        if (existing.data.kind === 'venta' && existing.data.agencyShareSettled) throw httpError(403, 'Esta venta ya fue liquidada');
      }
      await db.query('DELETE FROM records WHERE collection = $1 AND id = $2', [collection, id]);
      // Si se elimina un agente, se elimina también su acceso
      if (collection === 'agents') await db.query(`DELETE FROM users WHERE id = $1 AND role = 'broker'`, [id]);
    }

    return result;
  });

  send(res, 200, { ok: true, saved });
});
