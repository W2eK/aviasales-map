export interface DistrictsProperties {
  district_id: number;
  name: string;
}

export interface DistrictsGeojson
  extends GeoJSON.FeatureCollection<GeoJSON.Polygon, DistrictsProperties> {}
