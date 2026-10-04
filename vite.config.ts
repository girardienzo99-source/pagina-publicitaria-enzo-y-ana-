import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';

/**
 * Serves the Vercel functions in /api during `npm run dev`, so the lead form and
 * admin login behave locally exactly like in production. Handlers use the Web
 * standard signature: `export async function POST(request: Request): Response`.
 */
function vercelApiDevServer(): Plugin {
  return {
    name: 'vercel-api-dev-server',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = new URL(req.url || '/', 'http://localhost');
        const match = url.pathname.match(/^\/api\/([a-z0-9-]+)\/?$/i);
        if (!match) return next();

        try {
          const mod = await server.ssrLoadModule(path.resolve(__dirname, 'api', `${match[1]}.ts`));
          const handler = mod[req.method || 'GET'];
          if (typeof handler !== 'function') {
            res.statusCode = 405;
            return res.end('Method Not Allowed');
          }

          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(key, value);
          }
          const request = new Request(url, {
            method: req.method,
            headers,
            body: ['GET', 'HEAD'].includes(req.method || 'GET') ? undefined : Buffer.concat(chunks),
          });

          const response: Response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (err) {
          console.error('[api dev]', err);
          res.statusCode = 500;
          res.end('API error');
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Expose server-only variables from .env.local to the dev API handlers.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), tailwindcss(), vercelApiDevServer()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('qrcode.react')) return 'vendor-qr';
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
              return 'vendor-react';
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
