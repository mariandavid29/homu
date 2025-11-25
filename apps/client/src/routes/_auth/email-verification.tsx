import { createFileRoute } from '@tanstack/react-router';
import { EmailVerification } from '@/client/features/auth/components/emailVerification/EmailVerification';

import {
  emailVerificationSearchSchema,
  requireAuth,
} from '@/client/features/auth/helpers';

export const Route = createFileRoute('/_auth/email-verification')({
  validateSearch: emailVerificationSearchSchema,
  beforeLoad: ({ context }) => requireAuth(context.authData),
  loader: ({ context: { authData } }) => {
    return { user: authData.user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <EmailVerification />;
}
