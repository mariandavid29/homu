import type { authClient } from '@/client/lib/authClient';

export type User = typeof authClient.$Infer.Session.user;
