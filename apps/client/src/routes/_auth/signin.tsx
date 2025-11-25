import { createFileRoute } from '@tanstack/react-router';
import { SigninForm } from '@/client/features/auth/components/signin/SigninForm';
import { requireGuest } from '@/client/features/auth/helpers';

export const Route = createFileRoute('/_auth/signin')({
  beforeLoad: ({ context }) => requireGuest(context.authData),
  component: RouteComponent,
});

function RouteComponent() {
  return <SigninForm />;
}
