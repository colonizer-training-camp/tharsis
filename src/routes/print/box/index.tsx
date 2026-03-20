import { createFileRoute } from '@tanstack/react-router';

import LayoutPanel from '@/components/LayoutPanel';

export const Route = createFileRoute('/print/box/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LayoutPanel>WORKING...</LayoutPanel>;
}
