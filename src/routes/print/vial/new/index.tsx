import { createFileRoute } from '@tanstack/react-router';

import NewVialBox from './-NewVialBox';

export const Route = createFileRoute('/print/vial/new/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewVialBox />;
}
