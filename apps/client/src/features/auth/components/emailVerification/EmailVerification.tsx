import { Button, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { useLoaderData, useRouter, useSearch } from '@tanstack/react-router';
import { Mail, OctagonX } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { sessionQueryOptions } from '../../queries';
import { useSendVerificationEmail } from '../../hooks';
import type { BetterFetchError } from 'better-auth/react';

export function EmailVerification() {
  const { user } = useLoaderData({ from: '/_auth/email-verification' });
  const {
    options: {
      context: { queryClient },
    },
    ...router
  } = useRouter();
  const { callbackURL } = useSearch({ from: '/_auth/email-verification' });
  const verificationEmailMutation = useSendVerificationEmail();

  const handleGoBack = async () => {
    await queryClient.invalidateQueries({
      queryKey: sessionQueryOptions.queryKey,
      exact: true,
    });

    if (router.history.canGoBack()) {
      router.history.back();
    }
    return router.navigate({ to: '/' });
  };

  const handleResend = () => {
    verificationEmailMutation.mutate(
      {
        email: user.email,
        callbackURL: callbackURL,
      },
      {
        onError: (error) => {
          const typedError = error as BetterFetchError;
          notifications.show({
            title: 'The verification email could not be resent',
            message: typedError.error.message ?? 'Please try again later',
            position: 'top-center',
            color: 'red',
            icon: <OctagonX />,
          });
        },
      },
    );
  };

  return (
    <Stack gap='xl' ta='center' align='center'>
      <ThemeIcon variant='light' size={80} radius='100%' color={'blue'}>
        <Mail size={40} />
      </ThemeIcon>

      <Title order={1}>Check your email</Title>
      <Text c='dimmed' size='md'>
        We've sent a{' '}
        <Text span inherit fw='600' c='var(--mantine-color-text)'>
          verification link
        </Text>{' '}
        to your email address
      </Text>

      <Stack gap='sm' w='100%'>
        <Text size='sm'>Didn't receive the email?</Text>
        <Button onClick={handleResend} fullWidth>
          Resend verification email
        </Button>
        <Button onClick={handleGoBack} variant='default' fullWidth>
          Back
        </Button>
      </Stack>
    </Stack>
  );
}
