import ky from 'ky';
import { router } from '@/client/lib/router';
import { queryClient } from '@/client/lib/queryClient';
import { sessionQueryOptions } from '@/client/shared/data/auth/queries';

export const httpClient = ky.extend({
  hooks: {
    afterResponse: [
      (_, __, response: Response) => {
        if (response.status === 401) {
          queryClient.invalidateQueries({
            queryKey: sessionQueryOptions.queryKey,
            exact: true,
          });
          router.navigate({ to: '/', replace: true });
        }
        return response;
      },
    ],
  },
});
