import { IATA } from 'interfaces/iata.interface';

type Override = Partial<{
  zoom: number;
  bearing: number;
  center: [number, number];
  id: number;
}>;

export const overrides: Partial<Record<IATA, Override>> = {
  AMS: { center: [4.894, 52.373], zoom: 12, bearing: 10, id: 922 },
  ATH: { id: 196, zoom: 13 },
  AYT: { id: 175, bearing: -25, zoom: 11 },
  BGY: { id: 666, bearing: 10 },
  BCN: { id: 384, bearing: -15 },
  BUS: { id: 233, zoom: 13, bearing: -140 },
  CPH: { id: 900, zoom: 12 },
  CPT: { bearing: -170 },
  LED: { id: 41, bearing: -80 },
  MSQ: { id: 376 },
  TBS: { zoom: 13, bearing: -80, id: 65 },
  VCE: { id: 620, bearing: -25 },
  VNO: { id: 784, zoom: 12.5 }
};
