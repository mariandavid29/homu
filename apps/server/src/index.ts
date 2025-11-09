import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { routesApp } from '@/server/routes';
import { AppFactory } from '@/server/shared/factory';
import { injectSession } from './lib/auth/middleware';

const app = AppFactory.createApp();

app.use(logger());
app.use(
  '/api/auth/*',
  cors({
    origin: 'http://localhost:3000',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
);
app.use((c, next) => {
  if (c.req.path.startsWith('/api')) {
    return next();
  }
  const requestURL = new URL(c.req.raw.url);
  return c.env.ASSETS.fetch(new URL('/index.html', requestURL.origin));
});
app.use(injectSession);
app.on(['GET', 'POST'], '/api/auth/*', (c) =>
  c.var.authClient.handler(c.req.raw),
);
app.route('/api', routesApp);

export default app;
