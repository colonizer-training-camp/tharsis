import { createFileRoute } from '@tanstack/react-router';

import type { Bottle } from '../-types';

import LabelPrintPage from './-LabelPrintPage';

type LabelSearch = Bottle;

export const Route = createFileRoute('/print/bottle/label/')({
  validateSearch: (search: Record<string, unknown>): LabelSearch => ({
    brand: (search.brand as string) ?? '',
    name: (search.name as string) ?? '',
    description: (search.description as string) ?? null,
    labelledAt: (search.labelledAt as string) ?? '',
    abv: (search.abv as string) ?? '',
    meta: (search.meta as string) ?? '',
    metaValue: (search.metaValue as string) ?? '',
    whiskybase: (search.whiskybase as string) ?? undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const bottle = Route.useSearch();
  return <LabelPrintPage bottle={bottle} />;
}
