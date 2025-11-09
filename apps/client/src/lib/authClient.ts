import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  fetchOptions: {
    throw: true,
  },
});
