export type BottleData = {
  id: string;
  brand: string;
  name: string;
  description: string | null;
  abv: string;
  meta: string;
  metaValue: string;
  whiskybase?: string;
};

export type Bottle = BottleData & {
  labelledAt: string;
};
