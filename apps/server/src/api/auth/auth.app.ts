import { AppFactory } from '@/server/shared/factory';

export const authApp = AppFactory.createApp().on(['GET', 'POST'], '/*', (c) =>
  c.var.authClient.handler(c.req.raw),
);
