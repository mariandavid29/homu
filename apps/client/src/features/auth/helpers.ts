import * as z from 'zod';
import { redirect } from '@tanstack/react-router';
import { sessionQueryOptions } from './queries';
import type { QueryClient } from '@tanstack/react-query';
import type { AuthData } from './types';

export async function loadSession(queryClient: QueryClient) {
  try {
    const authData = await queryClient.fetchQuery(sessionQueryOptions);
    return { authData };
  } catch (_error) {
    return { authData: null };
  }
}
export function requireAuth(authData: AuthData | null) {
  if (!authData) {
    throw redirect({ to: '/signin' });
  }
  return { authData };
}
export function requireGuest(authData: AuthData | null) {
  if (authData) {
    throw redirect({ to: '/' });
  }
  return { authData };
}

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { error: 'Name must be at least 2 characters' })
      .max(32, { error: 'Name is too long' }),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(8, { error: 'Password must be at least 8 characters' })
      .max(128, { error: 'Password must be at most 128 characters' }),
    passwordConfirmation: z
      .string()
      .min(1, { error: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });
export const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, { error: 'Password is required' }),
});
export const emailVerificationSearchSchema = z.object({
  callbackURL: z.url(),
});
