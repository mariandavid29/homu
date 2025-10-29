import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { createFactory } from 'hono/factory';
import * as schema from '@/server/lib/db/schema';

type Env = {
  Bindings: CloudflareBindings;
  Variables: {
    db: NeonHttpDatabase<typeof schema> & {
      $client: NeonQueryFunction<false, false>;
    };
  };
};

export const AppFactory = createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const sql = neon(c.env.DATABASE_URL);
      const db = drizzle(sql, { schema });
      c.set('db', db);
      await next();
    });
  },
});
