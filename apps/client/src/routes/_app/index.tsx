import { createFileRoute } from '@tanstack/react-router';
import { Center, Stack, Title } from '@mantine/core';
import { QuickSearch } from '@/client/features/searchWizard/components/quickSearch/QuickSearch';

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Center mt='xl'>
      <Stack>
        <Title order={2}>Quick Search</Title>
        <QuickSearch />
      </Stack>
    </Center>
  );
}
