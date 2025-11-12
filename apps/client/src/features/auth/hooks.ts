import { useMutation, useQuery } from '@tanstack/react-query';
import { sessionQueryOptions } from './queries';
import type { SigninData, SignupData } from './types';
import { queryClient } from '@/client/lib/queryClient';
import { authClient } from '@/client/lib/authClient';
import { router } from '@/client/lib/router';

export function useSession() {
  return useQuery(sessionQueryOptions);
}

export function useSignup() {
  return useMutation({
    mutationKey: ['auth', 'signup'] as const,
    mutationFn: (signupData: SignupData) => authClient.signUp.email(signupData),
    onSuccess: async () => {
      void queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      await router.navigate({ to: '/' });
    },
  });
}

export function useSignin() {
  return useMutation({
    mutationKey: ['auth', 'signin'] as const,
    mutationFn: (signinData: SigninData) => authClient.signIn.email(signinData),
    onSuccess: async () => {
      void queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      await router.navigate({ to: '/', replace: true });
    },
  });
}

export function useSignout() {
  return useMutation({
    mutationKey: ['auth', 'signout'] as const,
    mutationFn: () => authClient.signOut(),
    onSuccess: async () => {
      void queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
        exact: true,
      });
      await router.navigate({ to: '/' });
    },
  });
}
