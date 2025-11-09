import { createMiddleware } from 'hono/factory';
import type { NeonQueryFunction } from '@neondatabase/serverless';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from '@/server/lib/db/models';
import type { auth } from '@/server/lib/auth/config';
import type { createAuthClient } from '@/server/lib/auth/client';

type ProtectedAppEnv = {
  Bindings: CloudflareBindings;
  Variables: {
    db: NeonHttpDatabase<typeof schema> & {
      $client: NeonQueryFunction<false, false>;
    };
    authClient: ReturnType<typeof createAuthClient>;

    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};

export const verifySession = createMiddleware<ProtectedAppEnv>(
  async (c, next) => {
    const user = c.get('user');
    const session = c.get('session');

    if (!user || !session) {
      return c.body(null, 401);
    }

    return await next();
  },
);
