// Import { auth } from './lib/auth/handler';
import { routesApp } from './routes';
import { AppFactory } from './shared/factory';

const app = AppFactory.createApp();

// App.on(['GET', 'POST'], '/api/auth/*', (c) => {
//   Return auth(c.env).handler(c.req.raw);
// });

const _appRoutes = app.route('/api', routesApp);

export default app;
export type AppInterfaces = typeof _appRoutes;
