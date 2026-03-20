export type BottleData = {
  brand: string;
  name: string;
  description: string;
  abv: string;
  meta: string;
  metaValue: string;
};

export type Bottle = BottleData & {
  labeledAt: string;
};
