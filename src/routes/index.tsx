import { createFileRoute } from '@tanstack/react-router';

import Home from './-Home';
import type { BottleData } from './print/bottle/-types';

export const Route = createFileRoute('/')({
  loader: async () => {
    const res = await fetch(`${import.meta.env.BASE_URL}bottles.json`);
    const bottles: BottleData[] = await res.json();
    return { bottles };
  },
  component: Index,
});

function Index() {
  return <Home />;
}
