import { AppShell, Group, Paper } from '@mantine/core';
import styles from './AuthContainer.module.css';
import type { PropsWithChildren } from 'react';
import { Logo } from '@/client/shared/components/logo/Logo';

export function AuthCard({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: 80 }} padding='md'>
      <AppShell.Header>
        <Group className={styles.headerGroup}>
          <Logo />
        </Group>
      </AppShell.Header>
      <AppShell.Main className={styles.container}>
        <Paper className={styles.card}>{children}</Paper>
      </AppShell.Main>
    </AppShell>
  );
}
