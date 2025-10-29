import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { betterAuthOptions } from './options';
import * as schema from '@/server/lib/db/schema';

export const auth = (env: CloudflareBindings) => {
  const sql = neon(env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  return betterAuth({
    ...betterAuthOptions,
    database: drizzleAdapter(db, { provider: 'pg', schema: schema }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
  });
};
