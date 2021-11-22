import salesman, { Point } from 'salesman.js';
import * as turf from '@turf/turf';

interface PointWithId extends Point {
  id: number;
}

const coefficient = 0.9999; // 0.9999999;

// TODO: Add caching
export const computePointOrder = <
  T extends GeoJSON.FeatureCollection<GeoJSON.Point, U>,
  U extends Record<string, any> & { id: number }
>(
  geojson: T
): number[] => {
  const mercator = turf.toMercator(geojson);
  const mappedById = geojson.features.reduce(
    (obj, feature) => ((obj[feature.properties.id] = feature), obj),
    {} as Record<number, T['features'][number]>
  );
  const points = mercator.features.map(({ geometry, properties: { id } }) => {
    const [x, y] = geometry.coordinates;
    const point = new salesman.Point(x, y) as PointWithId;
    point.id = id;
    return point;
  });
  let solution = salesman.solve(points, coefficient);
  let ordered = solution.map(i => mappedById[points[i].id]);
  const line = turf.lineString([
    ...turf.coordAll(turf.featureCollection(ordered)),
    turf.getCoord(ordered[0])
  ]);
  const { i: segmentIndex, length } = turf.segmentReduce<{ length: number; i: number }>(
    line,
    (prev, next, _, __, ___, i) => {
      if (next) {
        const length = turf.length(next);
        return prev!.length < length ? { length, i: i! } : prev!;
      }
      return prev!;
    },
    { length: 0, i: 0 }
  );
  ordered = [...ordered.slice(segmentIndex + 1), ...ordered.slice(0, segmentIndex + 1)];
  const orderedLine = turf.lineString(
    turf.coordAll(turf.featureCollection(ordered))
  );
  // console.log(JSON.stringify(orderedLine));
  return solution.map(i => points[i].id);
};
