import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import {
  Anchor,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import { OctagonX } from 'lucide-react';
import { signInSchema } from '../../helpers';
import { useSignin } from '../../hooks';
import type { BetterFetchError } from 'better-auth/react';

export function SigninForm() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(signInSchema),
  });
  const signinMutation = useSignin();

  const onSubmit = (values: typeof form.values) => {
    signinMutation.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (error) => {
          const typedError = error as BetterFetchError;
          notifications.show({
            title: 'Sign in has failed',
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
    <Stack gap='xl'>
      <Title order={1}>Sign in</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap='md'>
          <TextInput
            withAsterisk
            label='Email'
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label='Password'
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <Button loading={signinMutation.status === 'pending'} type='submit'>
            Submit
          </Button>

          <Text>
            Don't have an account?{' '}
            <Anchor
              fw='600'
              renderRoot={(props) => <Link to='/signup' {...props} />}>
              Sign up
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Stack>
  );
}
