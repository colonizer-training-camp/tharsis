export type VialData = {
  brand: string;
  name: string;
  abv: string;
  ppm: string;
};

export type VialBox = {
  vials: VialData[];
  labeledAt: string;
};
