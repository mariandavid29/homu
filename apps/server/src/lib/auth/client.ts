import type { NeonQueryFunction } from '@neondatabase/serverless';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { createBetterAuthOptions } from '@/server/lib/auth/options';
import * as schema from '@/server/lib/db/models';

export const createAuthClient = (
  env: CloudflareBindings,
  db: NeonHttpDatabase<typeof schema> & {
    $client: NeonQueryFunction<false, false>;
  },
) => {
  return betterAuth({
    ...createBetterAuthOptions(env.RESEND_SECRET),
    database: drizzleAdapter(db, { provider: 'pg', schema: schema }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
  });
};
