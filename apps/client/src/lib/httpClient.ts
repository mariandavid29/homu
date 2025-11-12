import ky from 'ky';
import { sessionQueryOptions } from '../features/auth/queries';
import { router } from '@/client/lib/router';
import { queryClient } from '@/client/lib/queryClient';

export const httpClient = ky.extend({
  hooks: {
    afterResponse: [
      (_, __, response: Response) => {
        if (response.status === 401) {
          void queryClient.invalidateQueries({
            queryKey: sessionQueryOptions.queryKey,
            exact: true,
          });
          void router.navigate({ to: '/', replace: true });
        }
        return response;
      },
    ],
  },
});
