import { queryOptions } from '@tanstack/react-query';
import { authClient } from '@/client/lib/authClient';

export const sessionQueryOptions = queryOptions({
  queryKey: ['auth', 'session'] as const,
  queryFn: ({ signal }) => authClient.getSession({ fetchOptions: { signal } }),
  staleTime: 1000 * 60 * 5,
});
