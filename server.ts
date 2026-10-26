import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VALID_STATIC_ROUTES = new Set([
  '/',
  '',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
  '/standards',
  '/workstation',
  '/directory',
  '/cheat-sheet',
  '/robots.txt',
  '/sitemap.xml',
]);

async function startServer() {
  const app = express();
  app.use(express.json());

  const isProduction = process.env.NODE_ENV === 'production';
  const root = process.cwd();

  // API endpoints if needed
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'FormulaCalcKit Server',
      timestamp: new Date().toISOString(),
      standards: 'ISO/IEC 80000 & NIST SP 811 Compliant',
    });
  });

  let vite: any;
  if (!isProduction) {
    vite = await createViteServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(root, 'dist'), { index: false }));
  }

  // Handle SPA routing with authentic 200 vs 404 HTTP status codes
  app.get('*', async (req, res, next) => {
    const rawPath = req.path.toLowerCase().replace(/\/$/, '') || '/';

    // Ignore asset / file extensions (e.g. .js, .css, .svg, .png, .ico, .map)
    if (path.extname(req.path)) {
      return next();
    }

    const isValidRoute = VALID_STATIC_ROUTES.has(rawPath);
    const statusCode = isValidRoute ? 200 : 404;

    try {
      let html: string;
      if (!isProduction && vite) {
        const templatePath = path.resolve(root, 'index.html');
        let rawHtml = fs.readFileSync(templatePath, 'utf-8');
        html = await vite.transformIndexHtml(req.originalUrl, rawHtml);
      } else {
        const distHtmlPath = path.resolve(root, 'dist', 'index.html');
        html = fs.readFileSync(distHtmlPath, 'utf-8');
      }

      // If route is invalid (404), inject noindex meta tag to strictly prevent soft 404 for SEO crawlers
      if (!isValidRoute) {
        html = html.replace(
          '<head>',
          '<head>\n    <meta name="robots" content="noindex, follow" />\n    <meta name="prerender-status-code" content="404" />'
        );
      }

      res.status(statusCode).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    } catch (e: any) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`FormulaCalcKit server running at http://0.0.0.0:${port}`);
  });
}

startServer();
