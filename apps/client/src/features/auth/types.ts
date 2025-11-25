import type { authClient } from '@/client/lib/authClient';

export type AuthData = typeof authClient.$Infer.Session;
export type User = AuthData['user'];
export type SignupData = {
  name: string;
  email: string;
  password: string;
};

export type SigninData = {
  email: string;
  password: string;
};

export type VerificationEmailData = {
  email: string;
  callbackURL: string;
};
