import { AppFactory } from '@/server/shared/factory';

export const injectSession = AppFactory.createMiddleware(async (c, next) => {
  const session = await c.var.authClient.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!session) {
    c.set('user', null);
    c.set('session', null);
    await next();
    return;
  }
  c.set('user', session.user);
  c.set('session', session.session);
  await next();
});
