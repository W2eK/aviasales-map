interface DistrictsProperties {
  district_id: number;
  name: string;
}

export interface DistrictsGeoJSON
  extends GeoJSON.FeatureCollection<GeoJSON.Polygon, DistrictsProperties> {}
