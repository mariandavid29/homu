import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { APIProvider } from '@vis.gl/react-google-maps';
import { loadSession } from '../features/auth/helpers';
import type { QueryClient } from '@tanstack/react-query';

import '@/client/styles';
import '@fontsource-variable/montserrat';

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
      <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY}>
        <MantineProvider
          theme={{ fontFamily: 'Montserrat Variable, sans-serif' }}>
          <Notifications />
          <Outlet />
        </MantineProvider>
      </APIProvider>
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
