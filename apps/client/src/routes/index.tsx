import { createFileRoute } from '@tanstack/react-router';
import { Paper, Text } from '@mantine/core';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <Paper shadow='xs' p='xl'>
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that
        require background with shadow
      </Text>
    </Paper>
  );
}
