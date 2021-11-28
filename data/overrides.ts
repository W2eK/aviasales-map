import { Position } from 'interfaces/geodata.interface';
import { IATA } from 'interfaces/iata.interface';

type Override = Partial<{
  zoom: number;
  bearing: number;
  center: Position;
  id: number;
}>;

export const overrides: Partial<Record<IATA, Override>> = {
  AER: { id: 270, bearing: 20, zoom: 12.5 },
  AMM: { id: 604, bearing: 35, zoom: 7 },
  AMS: { center: [4.894, 52.373], zoom: 12, bearing: 10, id: 922 },
  ATH: { id: 196, bearing: 80, zoom: 13 },
  AYT: { id: 175, bearing: -25, zoom: 11 },
  BGY: { id: 666, bearing: 10 },
  BEG: { id: 487, bearing: -10, zoom: 12.5 },
  BER: { id: 329, bearing: -40, zoom: 11 },
  BIO: { id: 1009, bearing: -40, zoom: 13 },
  BKK: { id: 855, bearing: -30, zoom: 12 },
  TXL: { id: 329, bearing: -40, zoom: 11 },
  BCN: { id: 384, bearing: -15 },
  BUD: { id: 642, bearing: 35, zoom: 13 },
  BUS: { id: 233, zoom: 13, bearing: -140 },
  CAI: { id: 562, bearing: 50, zoom: 10.5 },
  CDG: { id: 359, bearing: 80, zoom: 12 },
  CHQ: { id: 485, bearing: -35, zoom: 7.5 },
  CMB: { id: 984, bearing: 15, zoom: 7 },
  CPH: { id: 900, bearing: 30, zoom: 12 },
  CPT: { bearing: -170 },
  DXB: { id: 180, bearing: -115, zoom: 11 },
  EVN: { id: 467, bearing: 15, zoom: 13 },
  FCO: { id: 220, bearing: -45, zoom: 12.5 },
  FLR: { id: 671, bearing: -20, zoom: 13 },
  FNC: { id: 458, bearing: -45, zoom: 9.5 },
  FRS: { id: 599, bearing: -20, zoom: 11.5 },
  HRG: { id: 904, bearing: -10, zoom: 11.5 },
  GDZ: { id: 167, bearing: -25, zoom: 8 },
  GOJ: { id: 801, bearing: -80 },
  IEV: { id: 300, bearing: -25, zoom: 12.5 },
  IKT: { id: 447, bearing: 95, zoom: 12 },
  IST: { id: 16, bearing: 60, zoom: 12 },
  JMK: { id: 990, bearing: 20, zoom: 13.5 },
  KIV: { id: 499, bearing: 5, zoom: 12.5 },
  KGD: { id: 68, bearing: -35, zoom: 12 },
  KRR: { id: 505, bearing: -20, zoom: 12.5 },
  KZN: { id: 245, bearing: 90, zoom: 12.5 },
  LAS: { id: 1026, bearing: -30, zoom: 11.5 },
  LCA: { id: 401, bearing: 45, zoom: 8 },
  LGA: { id: 213, bearing: 45, zoom: 12 },
  LIS: { id: 830, bearing: 35, zoom: 12.5 },
  LHR: { id: 839, bearing: -55, zoom: 11.5 },
  LED: { id: 41, bearing: -65, zoom: 12 },
  LWO: { id: 942, bearing: 60, zoom: 13 },
  MAD: { id: 304, bearing: 45, zoom: 12.5 },
  MID: { id: 596, bearing: -85, zoom: 7.5 },
  MSQ: { id: 378, bearing: -25, zoom: 12 },
  MRV: { id: 680, bearing: -85, zoom: 11.5 },
  MUC: { id: 872, bearing: 40, zoom: 12.5 },
  NYC: { id: 213, bearing: 10, zoom: 12 },
  NYO: { id: 728, bearing: 45, zoom: 12.5 },
  ODS: { id: 789, bearing: -40, zoom: 12.5 },
  OVB: { id: 973, bearing: 100, zoom: 11.5 },
  PRG: { id: 693, bearing: 35, zoom: 12 },
  RIX: { id: 862, bearing: 25, zoom: 12 },
  SCL: { id: 1020, bearing: 45, zoom: 5.5 },
  SDU: { id: 571, bearing: 30, zoom: 11.5 },
  SIP: { id: 198, bearing: 55, zoom: 8 },
  SKG: { id: 258, bearing: -15, zoom: 12.5 },
  SPU: { id: 626, bearing: -35, zoom: 13 },
  SVX: { id: 771, bearing: -40, zoom: 12 },
  TAS: { id: 914, bearing: -65, zoom: 12.5 },
  TBS: { zoom: 13, bearing: -80, id: 65 },
  TCI: { id: 434, bearing: 20, zoom: 9.5 },
  TGD: { id: 318, bearing: -20, zoom: 10 },
  TLL: { id: 740, bearing: 45, zoom: 13 },
  TOF: { id: 763, bearing: 45, zoom: 12 },
  UFA: { id: 696, bearing: 70, zoom: 12 },
  UTP: { id: 967, bearing: -40, zoom: 11 },
  VCE: { id: 620, bearing: -30 },
  VIE: { id: 817, bearing: 35, zoom: 12 },
  VKO: { id: 51, bearing: 30, zoom: 12 },
  VLC: { id: 717, bearing: 100, zoom: 13 },
  VNO: { id: 786, bearing: -50, zoom: 12.5 },
  VNY: { id: 888, bearing: 50.5, zoom: 10.5 },
  VVO: { id: 372, bearing: 75, zoom: 12.5 },
  WAW: { id: 807, bearing: -170 }
};
