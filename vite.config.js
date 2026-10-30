import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Custom middleware that ensures if the user places `farmhouse-hero.png` or
 * `farmhouse-entry.mp4` in either `alpenruh/public/...` or the parent
 * workspace root `../public/...` (or directly in `../`), it is served cleanly.
 */
function assetFallbackPlugin() {
  return {
    name: 'mansion-alpine-asset-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const cleanUrl = req.url.split('?')[0];

        if (
          cleanUrl === '/images/farmhouse-hero.png' ||
          cleanUrl === '/videos/farmhouse-entry.mp4'
        ) {
          const primaryPath = path.join(__dirname, 'public', cleanUrl);
          const parentPublicPath = path.join(__dirname, '..', 'public', cleanUrl);
          const parentDirectPath = path.join(
            __dirname,
            '..',
            path.basename(cleanUrl)
          );

          const candidates = [primaryPath, parentPublicPath, parentDirectPath];
          for (const candidate of candidates) {
            if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
              const ext = path.extname(candidate).toLowerCase();
              const mime =
                ext === '.png'
                  ? 'image/png'
                  : ext === '.jpg' || ext === '.jpeg'
                  ? 'image/jpeg'
                  : ext === '.mp4'
                  ? 'video/mp4'
                  : 'application/octet-stream';
              const stat = fs.statSync(candidate);
              res.setHeader('Content-Type', mime);
              res.setHeader('Content-Length', stat.size);
              if (req.method === 'HEAD') {
                res.statusCode = 200;
                return res.end();
              }
              return fs.createReadStream(candidate).pipe(res);
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), assetFallbackPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
