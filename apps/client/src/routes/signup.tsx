import { createFileRoute } from '@tanstack/react-router';
import { AuthCard } from '../features/auth/components/authContainer/AuthContainer';
import { SignupForm } from '@/client/features/auth/components/signup/SignupForm';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthCard>
      <SignupForm />
    </AuthCard>
  );
}
