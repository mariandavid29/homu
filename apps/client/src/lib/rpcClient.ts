import createRpcClient from '@homu/rpc';
import { httpClient } from '@/client/lib/httpClient';

export const rpcClient = createRpcClient('/api', {
  init: {
    credentials: 'include',
  },
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
    return httpClient(`${input}`, {
      method: requestInit?.method,
      headers: {
        ...requestInit?.headers,
      },
      body: requestInit?.body,
    });
  },
});
