import type { auth } from './config';

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
