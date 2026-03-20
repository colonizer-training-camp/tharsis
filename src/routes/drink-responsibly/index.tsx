import { createFileRoute } from '@tanstack/react-router';

import DrinkResponsibly from './-DrinkResponsibly';

export const Route = createFileRoute('/drink-responsibly/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DrinkResponsibly />;
}
