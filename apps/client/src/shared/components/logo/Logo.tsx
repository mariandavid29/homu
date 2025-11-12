import { Button, Text } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import LogoSVG from '@/client/assets/icons/homu-logo.svg?react';

export function Logo() {
  return (
    <Button
      variant='transparent'
      justify='start'
      px={0}
      leftSection={<LogoSVG height='1.5em' width='1.5em' />}
      renderRoot={(props) => <Link to='/' underline='' {...props} />}>
      <Text fw='600' fz='h2' c='black'>
        homu
      </Text>
    </Button>
  );
}
