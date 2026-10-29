// Prepara la base de datos (Neon/Postgres):
//   npm run db:setup                 crea tablas, carga propiedades y equipo si está vacía, y la cuenta admin
//   npm run db:setup -- --admin-password   cambia la contraseña de la cuenta admin
// Lee DATABASE_URL de .env.local (o del entorno).
import { createInterface } from 'node:readline';
import { existsSync, readFileSync } from 'node:fs';

if (!process.env.DATABASE_URL && existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
  console.error('Falta DATABASE_URL (agregala en .env.local).');
  process.exit(1);
}

const { query, withTransaction, SCHEMA_SQL } = await import('../api/_lib/db.js');
const { hashPassword, MIN_PASSWORD_LENGTH } = await import('../api/_lib/auth.js');
const { INITIAL_ADMIN, INITIAL_AGENTS, INITIAL_PROPERTIES } = await import('../src/data/initialData.js');

// Pide una contraseña sin mostrarla en pantalla (o la toma de ADMIN_PASSWORD)
const askPassword = async () => {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  const ask = (prompt) => new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => { if (s.includes(prompt)) rl.output.write(s); };
    rl.question(prompt, (answer) => { rl.close(); process.stdout.write('\n'); resolve(answer); });
  });
  for (;;) {
    const first = await ask(`Contraseña para el usuario "admin" (mínimo ${MIN_PASSWORD_LENGTH} caracteres): `);
    if (first.length < MIN_PASSWORD_LENGTH) { console.log('Muy corta, probá de nuevo.'); continue; }
    if (first !== await ask('Repetila: ')) { console.log('No coinciden, probá de nuevo.'); continue; }
    return first;
  }
};

await query(SCHEMA_SQL);
console.log('✓ Tablas listas');

const { rows: [{ count }] } = await query('SELECT count(*)::int AS count FROM records');
if (count === 0) {
  await withTransaction(async (db) => {
    const insert = (collection, item) => db.query(
      'INSERT INTO records (collection, id, data) VALUES ($1, $2, $3)',
      [collection, item.id, item]
    );
    for (const p of INITIAL_PROPERTIES) await insert('properties', p);
    for (const { username, password, ...agent } of INITIAL_AGENTS) {
      await insert('agents', agent);
      // Usuarios de los brokers sin contraseña: la administración la asigna desde la app
      if (!agent.isOwner && username) {
        await db.query(
          `INSERT INTO users (id, username, role, name) VALUES ($1, $2, 'broker', $3) ON CONFLICT DO NOTHING`,
          [agent.id, username, agent.name]
        );
      }
    }
  });
  console.log(`✓ Cargadas ${INITIAL_PROPERTIES.length} propiedades y ${INITIAL_AGENTS.length} personas del equipo`);
} else {
  console.log(`• La base ya tenía datos (${count} registros): no se importó nada`);
}

const { rows: admins } = await query(`SELECT id FROM users WHERE role = 'admin'`);
if (admins.length === 0) {
  const password = await askPassword();
  await query(
    `INSERT INTO users (id, username, password_hash, role, name) VALUES ('admin', $1, $2, 'admin', $3)`,
    [INITIAL_ADMIN.username, await hashPassword(password), INITIAL_ADMIN.name]
  );
  console.log(`✓ Cuenta admin creada (usuario "${INITIAL_ADMIN.username}")`);
} else if (process.argv.includes('--admin-password')) {
  const password = await askPassword();
  await query(`UPDATE users SET password_hash = $1 WHERE role = 'admin'`, [await hashPassword(password)]);
  await query(`DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE role = 'admin')`);
  console.log('✓ Contraseña de admin actualizada');
} else {
  console.log('• La cuenta admin ya existe (para cambiar su contraseña: npm run db:setup -- --admin-password)');
}

process.exit(0);
