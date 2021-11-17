import * as turf from '@turf/turf';
import { PoiType } from 'interfaces/data.interface';
import { computeBbox } from './bbox';

export const buildVoronoi = <
  T extends GeoJSON.FeatureCollection<GeoJSON.Point, U>,
  U extends GeoJSON.GeoJsonProperties
>(
  geojson: T,
  clipping = false,
  radius = 1
): GeoJSON.FeatureCollection<GeoJSON.Polygon, U> => {
  const bbox = computeBbox(geojson, radius);

  const voronoi = turf.voronoi(geojson, {
    bbox
  }) as GeoJSON.FeatureCollection<GeoJSON.Polygon, U>;
  turf.featureEach(voronoi, (feature, index) => {
    if (feature) feature.properties = { ...geojson.features[index].properties };
  });

  if (clipping) {
    for (let i = 0; i < geojson.features.length; i++) {
      const polygon = voronoi.features[i];
      if (!polygon) continue;
      const point = geojson.features[i];
      const properties = point.properties;
      const buffer = turf.buffer(point, radius);
      const intersection = turf.intersect(polygon, buffer, {
        properties
      }) as GeoJSON.Feature<GeoJSON.Polygon, U>;
      voronoi.features[i] = intersection;
    }
  }

  // ! BUG: deal with multiple POI with same coordinates
  voronoi.features = voronoi.features.filter(Boolean);
  return voronoi;
};