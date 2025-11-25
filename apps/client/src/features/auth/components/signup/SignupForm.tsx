import {
  Anchor,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Link } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import { OctagonX } from 'lucide-react';
import { signUpSchema } from '../../helpers';
import { useSignup } from '../../hooks';
import type { BetterFetchError } from 'better-auth/react';

export function SignupForm() {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: zod4Resolver(signUpSchema),
  });

  form.watch('password', () => {
    if (form.isDirty('passwordConfirmation')) {
      form.validateField('passwordConfirmation');
    }
  });
  const signupMutation = useSignup();

  const onSubmit = (values: typeof form.values) => {
    signupMutation.mutate(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onError: (error) => {
          const typedError = error as BetterFetchError;
          notifications.show({
            title: 'Account could not be created',
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
      <Title order={1}>Sign up</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap='md'>
          <TextInput
            withAsterisk
            label='Name'
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

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

          <PasswordInput
            withAsterisk
            label='Confirm Password'
            key={form.key('passwordConfirmation')}
            {...form.getInputProps('passwordConfirmation')}
          />

          <Button loading={signupMutation.status === 'pending'} type='submit'>
            Submit
          </Button>

          <Text>
            Already have an account?{' '}
            <Anchor
              fw='600'
              renderRoot={(props) => <Link to='/signin' {...props} />}>
              Sign in
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Stack>
  );
}
