import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { Button } from '@mantine/core';
import { rpcClient } from '../lib/rpcClient';
import { useSignout, useSignup } from '@/client/shared/data/auth/hooks';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context: { authData } }) => {
    if (!authData) {
      console.log('NU AI USER', authData);
    }
  },
  loader: ({ context: { authData } }) => {
    if (authData) {
      return { user: authData.user };
    }
    return { user: null };
  },
  component: App,
});

function App() {
  const { user } = useLoaderData({ from: '/' });
  const signoutMutation = useSignout();
  const signupMutation = useSignup();

  return (
    <>
      <div className='p-2'>Hello, {user?.name ?? 'Anonimule'}</div>
      {user ?
        <Button
          onClick={() => {
            signoutMutation.mutate();
          }}>
          Sign out
        </Button>
      : <Button
          onClick={() => {
            signupMutation.mutate({
              name: 'bobysmurdaaaFinalCu SES',
              email: 'someEmailFinalcuses@gmail.com',
              password: 'pass123456',
            });
          }}>
          Create Account
        </Button>
      }
      <Button
        onClick={async () => {
          try {
            const res = await rpcClient.books.$get();
            console.log('RES', res);
            if (res.ok) {
              console.log('ok');
              const data = await res.json();
              console.log('DATA', data);
            } else {
              console.log('not ok');
            }
          } catch (error) {
            console.log('CATCH', error);
          }
        }}>
        See Books
      </Button>
    </>
  );
}
