export type Poi = {
  id: number;
  name: string;
  image_url: string;
  type: PoiType;
  description: string;
  camera: Camera;
};

export type Camera = {
  center: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
};

export type Category = {
  id: number;
  title: string;
  subtitle: string;
  type: PoiType;
};

export const poiTypes = [
  'districts',
  'famous',
  'local',
  'instaplaces',
  'beaches',
  'restaurants',
  'suburb',
  'nature',
  'parks'
] as const;

export type PoiType = typeof poiTypes[number];

export type CategoryType = 'all' | PoiType;
