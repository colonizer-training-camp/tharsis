export type BottleData = {
  brand: string;
  name: string;
  description: string | null;
  abv: string;
  meta: string;
  metaValue: string;
  whiskybase?: string;
};

export type Bottle = BottleData & {
  labeledAt: string;
};
