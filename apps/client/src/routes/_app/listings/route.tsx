import { Outlet, createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '@/client/shared/components/appLayout/AppLayout';

export const Route = createFileRoute('/_app/listings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
