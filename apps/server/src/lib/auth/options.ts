import type { BetterAuthOptions } from 'better-auth';

export const betterAuthOptions: BetterAuthOptions = {
  /**
   * The name of the application.
   */
  appName: 'homu',
  /**
   * Base path for Better Auth.
   * @default "/api/auth"
   */
  basePath: '/api/auth',
  emailAndPassword: {
    enabled: true,
  },

  // .... More options
};
