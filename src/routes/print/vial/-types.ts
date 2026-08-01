export type VialData = {
  brand: string;
  name: string;
  abv: string;
  meta: string;
  metaValue: string;
};

export type VialBox = {
  vials: VialData[];
  labeledAt: string;
};
