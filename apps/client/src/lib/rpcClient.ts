import { hc } from 'hono/client';
import type { AppInterfaces } from '@/server/routes';

export const rpcClient = hc<AppInterfaces>('/api');
