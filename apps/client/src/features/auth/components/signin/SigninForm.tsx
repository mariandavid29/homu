import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { signInSchema } from '../../helpers';
import { useSignin } from '../../hooks';

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
    signinMutation.mutate({
      email: values.email,
      password: values.password,
    });
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
        </Stack>
      </form>
    </Stack>
  );
}
