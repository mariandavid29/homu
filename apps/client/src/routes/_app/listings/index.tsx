import { createFileRoute } from '@tanstack/react-router';
import { ListingsRoot } from '@/client/features/listings/components/listingsRoot/ListingsRoot';
import { listingsSearchSchema } from '@/client/features/listings/helpers';

export const Route = createFileRoute('/_app/listings/')({
  validateSearch: listingsSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return <ListingsRoot />;
}
