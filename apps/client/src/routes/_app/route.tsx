import { Outlet, createFileRoute, useLoaderData } from '@tanstack/react-router';
import { AppLayout } from '@/client/shared/components/AppLayout/AppLayout';

export const Route = createFileRoute('/_app')({
  loader: ({ context: { authData } }) => {
    return { user: authData?.user ?? null };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useLoaderData({ from: '/_app' });
  return (
    <AppLayout user={user}>
      <Outlet />
    </AppLayout>
  );
}
