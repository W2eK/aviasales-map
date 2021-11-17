export const iataCodes = [
  'AER',
  'AMM',
  'AMS',
  'ATH',
  'AYT',
  'BAK',
  'BCN',
  'BEG',
  'BGY',
  'BKK',
  'BUD',
  'BUS',
  'CAI',
  'CPH',
  'CPT',
  'DME',
  'DWC',
  'EVN',
  'FCO',
  'FLR',
  'FNC',
  'FRS',
  'GDZ',
  'GOJ',
  'HER',
  'HRG',
  'IEV',
  'IKT',
  'IST',
  'KGD',
  'KIV',
  'KRR',
  'KZN',
  'LCA',
  'LED',
  'LGA',
  'LHR',
  'LIS',
  'MAD',
  'MID',
  'MRV',
  'MSQ',
  'MUC',
  'NYO',
  'ODS',
  'PAR',
  'PRG',
  'RIX',
  'SDU',
  'SIP',
  'SKG',
  'SPU',
  'SVX',
  'TBS',
  'TFS',
  'TIV',
  'TLL',
  'TOF',
  'TXL',
  'UFA',
  'VCE',
  'VIE',
  'VLN',
  'VNO',
  'VNY',
  'VVO',
  'WAW'
] as const;

export type IATA = typeof iataCodes[number];