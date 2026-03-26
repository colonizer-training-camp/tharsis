export type Capitalization = 'uppercase' | 'lowercase' | 'preserve';

export type BottleData = {
  brand: string;
  name: string;
  description: string | null;
  abv: string;
  meta: string;
  metaValue: string;
  whiskybase?: string;
  brandCapitalization?: Capitalization;
  nameCapitalization?: Capitalization;
  descriptionCapitalization?: Capitalization;
  metaCapitalization?: Capitalization;
  metaValueCapitalization?: Capitalization;
};

export type Bottle = BottleData & {
  labelledAt: string;
};
