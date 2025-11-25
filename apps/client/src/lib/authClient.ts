import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  fetchOptions: {
    throw: true,
  },
  plugins: [
    inferAdditionalFields({
      user: {
        bio: {
          type: 'string',
          required: false,
          input: true,
        },
      },
    }),
  ],
});
