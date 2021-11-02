export interface CityMapWrapper {
  city_map: CityMap;
}

export interface CityMap {
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

export interface Bounds {
  southwest: StartPoint;
  northeast: StartPoint;
}

export interface StartPoint {
  latitude: number;
  longitude: number;
}

export interface Provider {
  first_name: string;
  last_name: string;
  role: string;
  avatar_url: string;
  tags: string[];
  instagram_url: string;
  is_ambassador: boolean;
}

export interface Tab {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  icon_url: string;
  is_premium: boolean;
  type: string;
  list_type: string;
  pin_type: string;
  pins: Pin[];
}

export interface Pin {
  id: number;
  name: string;
  description: string;
  image_url: string;
  coordinates: StartPoint;
}
