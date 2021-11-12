import * as turf from '@turf/turf';
import { PoiType } from 'interfaces/city.interface';

export const buildVoronoi = <
  T extends GeoJSON.FeatureCollection<GeoJSON.Point, U>,
  U extends Record<string, any>
>(
  geojson: T,
  radius = 1
): GeoJSON.FeatureCollection<GeoJSON.Polygon, U> => {
  const bbox = turf.bbox(
    turf.buffer(turf.bboxPolygon(turf.bbox(geojson)), radius)
  );

  const voronoi = turf.voronoi(geojson, {
    bbox
  }) as GeoJSON.FeatureCollection<GeoJSON.Polygon, U>;
  turf.featureEach(
    voronoi,
    (feature, index) =>
      (feature.properties = { ...geojson.features[index].properties })
  );

  // ! BUG: deal with multiple POI with same coordinates
  voronoi.features = voronoi.features.filter(Boolean);
  return voronoi;
};

export const buildMultiVoronoi = <
  T extends GeoJSON.FeatureCollection<GeoJSON.Point, U>,
  U extends {
    id: number;
    type: PoiType;
  }
>(
  geojson: T,
  filters: PoiType[]
) => {
  const rest = filters.reduce((map, key) => {
    map[key] = turf.featureCollection([]) as T;
    return map;
  }, {} as Record<PoiType, T>);
  geojson.features.forEach(feature => {
    rest[feature.properties.type].features.push(feature);
  });

  const result: Partial<
    Record<
      PoiType | 'all',
      GeoJSON.FeatureCollection<GeoJSON.Polygon, U & { aggregated?: true }>
    >
  > = {};

  Object.entries(rest).forEach(([key, value]) => {
    const voronoi = buildVoronoi<T, U>(value);
    result[key as PoiType] = voronoi as GeoJSON.FeatureCollection<
      GeoJSON.Polygon,
      U & { aggregated?: true }
    >;
  });

  const all = buildVoronoi<T, U>(geojson);
  turf.propEach(all, properties => (properties!.aggregated = true));

  result['all'] = all as GeoJSON.FeatureCollection<
    GeoJSON.Polygon,
    U & { aggregated?: true }
  >;

  return Object.values(result).reduce((result, collection) => {
    result.features = result.features.concat(collection.features);
    return result;
  });
};
