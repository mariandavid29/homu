import type { BetterAuthOptions } from 'better-auth';

export const betterAuthOptions: BetterAuthOptions = {
  /**
   * the name of the application.
   */
  appName: 'homu',
  /**
   * base path for Better Auth.
   * @default "/api/auth"
   */
  basePath: '/api/auth',
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:3000'],

  // .... More options
};
