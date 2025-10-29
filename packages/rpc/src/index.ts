import type { AppInterfaces } from '@homu/server/interfaces';
import '@homu/server/worker-configuration';

import { hc } from 'hono/client';

const _client = hc<AppInterfaces>('');
export type Client = typeof _client;

export const hcWithTypes = (...args: Parameters<typeof hc>): Client =>
  hc<AppInterfaces>(...args);
