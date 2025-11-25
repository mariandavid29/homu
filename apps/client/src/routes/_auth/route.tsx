import { Outlet, createFileRoute } from '@tanstack/react-router';
import { AuthCard } from '@/client/features/auth/components/authContainer/AuthContainer';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthCard>
      <Outlet />
    </AuthCard>
  );
}
