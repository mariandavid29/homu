import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { signUpSchema } from '../../helpers';
import { useSignup } from '../../hooks';

export function SignupForm() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: zod4Resolver(signUpSchema),
  });
  const signupMutation = useSignup();

  const onSubmit = (values: typeof form.values) => {
    signupMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Stack gap='xl'>
      <Title order={1}>Sign up</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap='md'>
          <TextInput
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
        </Stack>
      </form>
    </Stack>
  );
}
