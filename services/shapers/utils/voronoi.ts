import * as turf from '@turf/turf';
import { PoiType } from 'interfaces/data.interface';
import { PoiGeojson, VoronoiProperties } from 'interfaces/geodata.interface';
import { computeBbox } from './bbox';

export const buildVoronoi = (
  geojson: PoiGeojson,
  clipping = false,
  radius = 1
): GeoJSON.FeatureCollection<GeoJSON.Polygon, VoronoiProperties> => {
  const bbox = computeBbox(geojson, radius);

  const voronoi = turf.voronoi(geojson, {
    bbox
  }) as GeoJSON.FeatureCollection<GeoJSON.Polygon, VoronoiProperties>;
  turf.featureEach(voronoi, (feature, index) => {
    const point = geojson.features[index];
    const [lon, lat] = point.geometry.coordinates;
    if (feature)
      feature.properties = {
        ...point.properties,
        lon,
        lat
      };
  });

  // if (clipping) {
  //   for (let i = 0; i < geojson.features.length; i++) {
  //     const polygon = voronoi.features[i];
  //     if (!polygon) continue;
  //     const point = geojson.features[i];
  //     const properties = point.properties;
  //     const buffer = turf.buffer(point, radius);
  //     const intersection = turf.intersect(polygon, buffer, {
  //       properties
  //     }) as GeoJSON.Feature<GeoJSON.Polygon, U>;
  //     voronoi.features[i] = intersection;
  //   }
  // }

  // ! BUG: deal with multiple POI with same coordinates
  voronoi.features = voronoi.features.filter(Boolean);
  return voronoi;
};
