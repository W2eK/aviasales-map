import { PoiType } from 'interfaces/data.interface';

export interface CityMap {
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
