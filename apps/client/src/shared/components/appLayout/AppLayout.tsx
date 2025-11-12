import { AppShell, Button, Group, Menu } from '@mantine/core';
import { Link, useLoaderData } from '@tanstack/react-router';
import { ChevronDown, User as UserIcon } from 'lucide-react';
import { Logo } from '../logo/Logo';
import styles from './AppLayout.module.css';
import type { PropsWithChildren } from 'react';
import type { User } from '@/client/features/auth/types';
import { useSignout } from '@/client/features/auth/hooks';

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
  const signoutMutation = useSignout();

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button
          color='black'
          leftSection={<UserIcon />}
          rightSection={<ChevronDown />}>
          {user.name}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item renderRoot={(props) => <Link to='/smth' {...props} />}>
          Dashboard
        </Menu.Item>
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
