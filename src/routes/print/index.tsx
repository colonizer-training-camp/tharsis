import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/print/')({
  component: RouteComponent,
  loader: () => {
    redirect({
      to: '/print/bottle/new',
      throw: true,
    });
  },
});

function RouteComponent() {
  return <></>;
}
