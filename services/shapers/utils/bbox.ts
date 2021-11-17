import { BBox2d } from '@turf/helpers/dist/js/lib/geojson';
import { bbox, buffer, bboxPolygon } from '@turf/turf';

export const computeBbox = (features: GeoJSON.FeatureCollection, radius = 1) =>
  bbox(buffer(bboxPolygon(bbox(features)), radius, { steps: 1 })) as BBox2d;
