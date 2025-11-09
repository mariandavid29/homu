import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { QueryClient } from '@tanstack/react-query';
import { sessionQueryOptions } from '@/client/shared/data/auth/queries';

import '@/client/styles';

type RootRouteContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  beforeLoad: ({ context }) => loadSession(context.queryClient),
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <MantineProvider>
        <Notifications />
        <Outlet />
      </MantineProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      <ReactQueryDevtools buttonPosition='top-right' />
    </>
  );
}

async function loadSession(queryClient: QueryClient) {
  try {
    const authData = await queryClient.fetchQuery(sessionQueryOptions);
    console.log(authData);
    return { authData };
  } catch (error) {
    console.log(error);
    return { authData: null };
  }
}
