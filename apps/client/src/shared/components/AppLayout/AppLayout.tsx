import { AppShell, Button, Group, Menu } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { Logo } from '../Logo';
import styles from './AppLayout.module.css';
import type { PropsWithChildren } from 'react';
import type { User } from '@/client/features/auth/types';
import { useSignup } from '@/client/features/auth/hooks';

export function AppLayout({
  children,
  user,
}: PropsWithChildren<{ user: User | null }>) {
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
  const signupMutation = useSignup();

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
          // renderRoot={(props) => <Link to='/signup' {...props} />}
          onClick={() => {
            signupMutation.mutate({
              email: 'smogEmia123l@gmail.com',
              name: 'testLayoutSt113uff',
              password: 'topPas123TR31p',
            });
          }}>
          Sign up
        </Button>
        <Button
          variant='default'
          renderRoot={(props) => <Link to='/signin' {...props} />}>
          Log in
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
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button>{user.name}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item renderRoot={(props) => <Link to='/smth' {...props} />}>
          Dashboard
        </Menu.Item>
        <Menu.Item renderRoot={(props) => <Link to='/smth' {...props} />}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
