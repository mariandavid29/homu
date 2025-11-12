import type { authClient } from '@/client/lib/authClient';

export type User = typeof authClient.$Infer.Session.user;
export type SignupData = {
  name: string;
  email: string;
  password: string;
};

export type SigninData = {
  email: string;
  password: string;
};
