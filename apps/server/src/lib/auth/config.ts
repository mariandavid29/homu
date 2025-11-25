import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { createBetterAuthOptions } from '@/server/lib/auth/options';

const { DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET, RESEND_SECRET } =
  process.env;

const sql = neon(DATABASE_URL!);
const db = drizzle(sql);

export const auth = betterAuth({
  ...createBetterAuthOptions(RESEND_SECRET!),
  database: drizzleAdapter(db, { provider: 'pg' }),
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
});
