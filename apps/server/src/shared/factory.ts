import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { createFactory } from 'hono/factory';
import * as schema from '@/server/lib/db/models';
import { createAuthClient } from '@/server/lib/auth/client';
import type { Session, User } from '../lib/auth/types';

type AppEnv = {
  Bindings: CloudflareBindings;
  Variables: {
    db: NeonHttpDatabase<typeof schema> & {
      $client: NeonQueryFunction<false, false>;
    };
    authClient: ReturnType<typeof createAuthClient>;

    user: User | null;
    session: Session | null;
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
