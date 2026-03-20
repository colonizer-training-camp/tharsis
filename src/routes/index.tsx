import { createFileRoute } from '@tanstack/react-router';

import type { BottleData } from './print/bottle/-types';
import Home from './-Home';

export const Route = createFileRoute('/')({
  loader: async () => {
    const res = await fetch(`${import.meta.env.BASE_URL}bottles.json`);
    const bottles: BottleData[] = await res.json();
    return { bottles };
  },
  component: Index,
});

function Index() {
  const { bottles } = Route.useLoaderData();
  return <Home bottles={bottles} />;
}
