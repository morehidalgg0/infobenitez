import { query } from './db.js';

// Datos del usuario que necesita la app. Un broker sin ficha de agente no tiene acceso.
export const buildProfile = async (user) => {
  if (user.role === 'admin') {
    return { id: user.id, role: 'admin', name: user.name || 'Administración', username: user.username };
  }
  const { rows } = await query(`SELECT data FROM records WHERE collection = 'agents' AND id = $1`, [user.id]);
  const agent = rows[0]?.data;
  if (!agent || agent.isOwner) return null;
  return {
    id: user.id,
    role: 'broker',
    name: agent.name,
    username: user.username,
    avatar: agent.avatar || '',
    agencySplitPercent: agent.agencySplitPercent ?? 50
  };
};
