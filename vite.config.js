import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// En desarrollo sirve las funciones de /api igual que Vercel
const vercelApiInDev = () => ({
  name: 'vercel-api-in-dev',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const match = req.url.match(/^\/api\/([a-z-]+)(\?|$)/);
      if (!match) return next();
      try {
        const mod = await server.ssrLoadModule(`/api/${match[1]}.js`);
        await mod.default(req, res);
      } catch (e) {
        next(e);
      }
    });
  }
});

export default defineConfig(({ mode }) => {
  // Variables del servidor (DATABASE_URL) desde .env.local, solo para /api en desarrollo
  Object.assign(process.env, { ...loadEnv(mode, process.cwd(), ''), ...process.env });
  return {
    plugins: [react(), vercelApiInDev()],
    server: {
      port: 3001,
      host: true
    }
  };
});
