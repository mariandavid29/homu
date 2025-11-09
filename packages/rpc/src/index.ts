import type { AppInterface } from '@homu/server/interface';

import { hc } from 'hono/client';

const _client = hc<AppInterface>('');
export type Client = typeof _client;

export default (...args: Parameters<typeof hc>): Client =>
  hc<AppInterface>(...args);
