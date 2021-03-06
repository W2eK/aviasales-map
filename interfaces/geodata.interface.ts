import { Poi } from './data.interface';

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
  lon: number;
  lat: number;
};
export type VoronoiGeojson = GeoJSON.FeatureCollection<
  GeoJSON.Polygon,
  VoronoiProperties
>;

export interface DistrictsProperties {
  district_id: number;
  name: string;
}

export interface DistrictsGeojson
  extends GeoJSON.FeatureCollection<GeoJSON.Polygon, DistrictsProperties> {}

export type Position = [number, number];
