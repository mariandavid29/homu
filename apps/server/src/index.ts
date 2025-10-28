import { Hono } from 'hono';
import { auth } from './lib/auth/handler';

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.on(['GET', 'POST'], '/api/auth/*', (c) => {
  return auth(c.env).handler(c.req.raw);
});

export default app;
