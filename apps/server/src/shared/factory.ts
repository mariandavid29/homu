import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { createFactory } from 'hono/factory';
import * as schema from '@/server/lib/db/models';
import type { auth } from '@/server/lib/auth/config';
import { createAuthClient } from '@/server/lib/auth/client';

type AppEnv = {
  Bindings: CloudflareBindings;
  Variables: {
    db: NeonHttpDatabase<typeof schema> & {
      $client: NeonQueryFunction<false, false>;
    };
    authClient: ReturnType<typeof createAuthClient>;

    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export const AppFactory = createFactory<AppEnv>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const sql = neon(c.env.DATABASE_URL);
      const db = drizzle(sql, { schema });
      const authClient = createAuthClient(c.env, db);
      c.set('db', db);
      c.set('authClient', authClient);
      await next();
    });
  },
});
