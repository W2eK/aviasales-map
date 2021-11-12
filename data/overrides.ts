import { IATA } from 'interfaces/city.interface';

type Override = Partial<{
  zoom: number;
  bearing: number;
  center: [number, number];
  id: number;
}>;

export const overrides: Partial<Record<IATA, Override>> = {
  ATH: { id: 196, zoom: 13 },
  TBS: { zoom: 13, bearing: -80, id: 65 },
  LED: { id: 41, bearing: -80 },
  CPH: { id: 900, zoom: 12 },
  BUS: { id: 233, zoom: 13, bearing: 140 },
  AMS: { center: [4.894, 52.373], zoom: 12, bearing: 10, id: 922 },
  MSQ: { id: 376 },
  VCE: { id: 620, bearing: -25 }
};
