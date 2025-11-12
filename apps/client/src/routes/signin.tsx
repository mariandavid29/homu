import { createFileRoute } from '@tanstack/react-router';
import { SigninForm } from '../features/auth/components/signin/SigninForm';
import { AuthCard } from '../features/auth/components/authContainer/AuthContainer';

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthCard>
      <SigninForm />
    </AuthCard>
  );
}
