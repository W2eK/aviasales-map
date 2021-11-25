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
  TXL: { id: 329, bearing: 75, zoom: 11 },
  BCN: { id: 384, bearing: -15 },
  BUD: { id: 642, bearing: 35, zoom: 13 },
  BUS: { id: 233, zoom: 13, bearing: -140 },
  CPH: { id: 900, zoom: 12 },
  CPT: { bearing: -170 },
  FRS: { id: 599, bearing: -20, zoom: 11.5 },
  GOJ: { id: 801, bearing: -80 },
  LED: { id: 41, bearing: -80 },
  MSQ: { id: 376 },
  NYC: { id: 213, bearing: 10, zoom: 12 },
  PRG: { id: 693, bearing: 35, zoom: 12 },
  RIX: { id: 862, bearing: 70, zoom: 12 },
  TBS: { zoom: 13, bearing: -80, id: 65 },
  VCE: { id: 620, bearing: -25 },
  VNO: { id: 786, bearing: -50, zoom: 12.5 },
  VVO: { id: 372, bearing: 75, zoom: 13 },
  WAW: { id: 807, bearing: -170 }
};
