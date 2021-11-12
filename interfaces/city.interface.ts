import { DistrictsGeojson } from './districts.interface';

export type City = {
  districtId: number;
  // id: number;
  title: string;
  camera: Camera;
  poi: Record<number, Poi>;
  // districts: District[];
  order: number[];
  categories: Category[];
  geojson: {
    poi: PoiGeojson;
    voronoi: VoronoiGeojson;
    labels: LabelsGeojson;
    // districts: DistrictsGeojson;
  };
};

export type Camera = {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
};

export type Poi = {
  id: number;
  name: string;
  image_url: string;
  type: PoiType;
  description: string;
  camera: Partial<Camera> & Pick<Camera, 'center'>;
};

// export type District = Poi & { description: string };

export type PoiProperties = Pick<Poi, 'id' | 'type'>;
export type PoiGeojson = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  PoiProperties
>;

export type LabelsProperties = PoiProperties & {
  name: string;
  description: string;
};
export type LabelsGeojson = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  LabelsProperties
>;

export type VoronoiProperties = PoiProperties & {
  aggregated?: true;
};
export type VoronoiGeojson = GeoJSON.FeatureCollection<
  GeoJSON.Polygon,
  VoronoiProperties
>;

export type Category = {
  id: number;
  title: string;
  subtitle: string;
  type: PoiType;
};

export type PoiType =
  | 'districts'
  | 'famous'
  | 'local'
  | 'instaplaces'
  | 'beaches'
  | 'restaurants'
  | 'suburb'
  | 'nature'
  | 'parks';

export type IATA =
  | 'AER'
  | 'AMM'
  | 'AMS'
  | 'ATH'
  | 'AYT'
  | 'BAK'
  | 'BCN'
  | 'BEG'
  | 'BGY'
  | 'BKK'
  | 'BUD'
  | 'BUS'
  | 'CAI'
  | 'CPH'
  | 'CPT'
  | 'DME'
  | 'DWC'
  | 'EVN'
  | 'FCO'
  | 'FLR'
  | 'FNC'
  | 'FRS'
  | 'GDZ'
  | 'GOJ'
  | 'HER'
  | 'HRG'
  | 'IEV'
  | 'IKT'
  | 'IST'
  | 'KGD'
  | 'KIV'
  | 'KRR'
  | 'KZN'
  | 'LCA'
  | 'LED'
  | 'LGA'
  | 'LHR'
  | 'LIS'
  | 'MAD'
  | 'MID'
  | 'MRV'
  | 'MSQ'
  | 'MUC'
  | 'NYO'
  | 'ODS'
  | 'PAR'
  | 'PRG'
  | 'RIX'
  | 'SDU'
  | 'SIP'
  | 'SKG'
  | 'SPU'
  | 'SVX'
  | 'TBS'
  | 'TFS'
  | 'TIV'
  | 'TLL'
  | 'TOF'
  | 'TXL'
  | 'UFA'
  | 'VCE'
  | 'VIE'
  | 'VLN'
  | 'VNO'
  | 'VNY'
  | 'VVO'
  | 'WAW';

export interface CityWrapper {
  city_map: CityRaw;
}

interface CityRaw {
  title: string;
  bounds: Bounds;
  start_point: StartPoint;
  start_zoom: number;
  min_zoom: number;
  max_zoom: number;
  promo_block_image_url: string;
  polygons_source_id: string;
  polygons_geo_json: string;
  providers: Provider[];
  tabs: Tab[];
}

interface Bounds {
  southwest: StartPoint;
  northeast: StartPoint;
}

interface StartPoint {
  latitude: number;
  longitude: number;
}

interface Provider {
  first_name: string;
  last_name: string;
  role: string;
  avatar_url: string;
  tags: string[];
  instagram_url: string;
  is_ambassador: boolean;
}

interface Tab {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  icon_url: string;
  is_premium: boolean;
  type: PoiType;
  list_type: string;
  pin_type: string;
  pins: Pin[];
}

interface Pin {
  id: number;
  name: string;
  description: string;
  image_url: string;
  coordinates: StartPoint;
}
