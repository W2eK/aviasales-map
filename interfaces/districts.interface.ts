interface DistrictsPolygonsProperties {
  district_id: number;
  name: string;
}

export interface DistrictsPolygonsGeojson
  extends GeoJSON.FeatureCollection<GeoJSON.Polygon, DistrictsPolygonsProperties> {}
