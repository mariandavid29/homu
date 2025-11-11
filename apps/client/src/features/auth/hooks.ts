import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionQueryOptions } from './queries';
import { queryClient } from '@/client/lib/queryClient';
import { authClient } from '@/client/lib/authClient';
import { router } from '@/client/lib/router';

type SignupData = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

type SigninData = {
  email: string;
  password: string;
};

export function useSession() {
  return useQuery(sessionQueryOptions);
}

export function useSignup() {
  return useMutation({
    mutationKey: ['auth', 'signup'] as const,
    mutationFn: (signupData: SignupData) => authClient.signUp.email(signupData),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      await router.invalidate();
    },
  });
}

export function useSignin() {
  return useMutation({
    mutationKey: ['auth', 'signin'] as const,
    mutationFn: (signinData: SigninData) => authClient.signIn.email(signinData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.navigate({ to: '/', replace: true });
    },
  });
}

export function useSignout() {
  return useMutation({
    mutationKey: ['auth', 'signout'] as const,
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      router.navigate({ to: '/', replace: true });
    },
  });
}
