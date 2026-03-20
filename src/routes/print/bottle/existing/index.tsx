import { createFileRoute } from '@tanstack/react-router';

import ExistingBottles from './-ExistingBottles';

export const Route = createFileRoute('/print/bottle/existing/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ExistingBottles />;
}
