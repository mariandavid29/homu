import { AppShell, Button, Group, Indicator, Menu } from '@mantine/core';
import { Link, useLoaderData, useRouter } from '@tanstack/react-router';
import { ChevronDown, OctagonX, User as UserIcon } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { Logo } from '../logo/Logo';
import styles from './AppLayout.module.css';
import type { PropsWithChildren } from 'react';
import type { User } from '@/client/features/auth/types';
import type { BetterFetchError } from 'better-auth/react';
import {
  useSendVerificationEmail,
  useSignout,
} from '@/client/features/auth/hooks';

export function AppLayout({ children }: PropsWithChildren) {
  const { user } = useLoaderData({ from: '/_app' });

  return (
    <AppShell header={{ height: 80 }} padding='md'>
      <AppShell.Header>
        <Group className={styles.headerGroup}>
          <Logo />
          {user ?
            <UserHeaderActions user={user} />
          : <GuestHeaderActions />}
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

function GuestHeaderActions() {
  return (
    <>
      <Group visibleFrom='sm'>
        <Button
          variant='transparent'
          renderRoot={(props) => <Link to='/' {...props} />}>
          Add Listing
        </Button>
        <Button
          variant='filled'
          renderRoot={(props) => <Link to='/signup' {...props} />}>
          Sign up
        </Button>
        <Button
          variant='default'
          renderRoot={(props) => <Link to='/signin' {...props} />}>
          Sign in
        </Button>
      </Group>
      <Button
        hiddenFrom='sm'
        variant='filled'
        renderRoot={(props) => <Link to='/signup' {...props} />}>
        Sign up
      </Button>
    </>
  );
}

function UserHeaderActions({ user }: { user: User }) {
  const router = useRouter();
  const signoutMutation = useSignout();
  const verificationEmailMutation = useSendVerificationEmail();

  const handleVerifyEmail = () => {
    verificationEmailMutation.mutate(
      {
        email: user.email,
        callbackURL: router.state.location.url,
      },
      {
        onSuccess: () => {
          void router.navigate({
            to: '/email-verification',
            search: { callbackURL: router.state.location.url },
          });
        },
        onError: (error) => {
          const typedError = error as BetterFetchError;
          notifications.show({
            title: 'The verification email could not be sent',
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
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Indicator
          disabled={user.emailVerified}
          color='black'
          processing
          size={14}>
          <Button
            color='black'
            variant='light'
            leftSection={<UserIcon />}
            rightSection={<ChevronDown />}>
            {user.name}
          </Button>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item renderRoot={(props) => <Link to='/smth' {...props} />}>
          Dashboard
        </Menu.Item>
        {!user.emailVerified && (
          <Menu.Item color='blue' onClick={handleVerifyEmail}>
            Verify your email
          </Menu.Item>
        )}
        <Menu.Item
          color='red'
          onClick={() => {
            signoutMutation.mutate();
          }}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
