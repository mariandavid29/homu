import { logger } from 'hono/logger';
import { routesApp } from './routes';
import { AppFactory } from './shared/factory';

const app = AppFactory.createApp();

app.use(logger());
app.use((c, next) => {
  if (c.req.path.startsWith('/api')) {
    return next();
  }
  const requestURL = new URL(c.req.raw.url);
  return c.env.ASSETS.fetch(new URL('/index.html', requestURL.origin));
});

app.route('/api', routesApp);

export default app;
