import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '@/client/features/auth/components/signup/SignupForm';
import { requireGuest } from '@/client/features/auth/helpers';

export const Route = createFileRoute('/_auth/signup')({
  beforeLoad: ({ context }) => {
    requireGuest(context.authData);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <SignupForm />;
}
