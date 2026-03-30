import { createFileRoute } from '@tanstack/react-router';

import ScanBottles from './-ScanBottles';

export const Route = createFileRoute('/scan/bottle/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ScanBottles />;
}
