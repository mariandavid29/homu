import { sendVerificationEmail } from '@/server/api/auth/auth.helpers';
import type { BetterAuthOptions } from 'better-auth';

export const createBetterAuthOptions = (resendSecret: string) => {
  return {
    appName: 'homu',
    basePath: '/api/auth',
    trustedOrigins: ['http://localhost:3000'],
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        bio: {
          type: 'string',
          required: false,
          input: true,
        },
      },
    },
    emailVerification: {
      sendOnSignUp: false,
      sendOnSignIn: false,
      sendVerificationEmail: async ({ user, url }) => {
        await sendVerificationEmail({
          apiKey: resendSecret,
          to: user.email,
          verificationLink: url,
        });
      },
    },
  } satisfies BetterAuthOptions;
};
