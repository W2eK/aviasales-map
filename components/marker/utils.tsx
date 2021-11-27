import { Map } from 'mapbox-gl';
import * as turf from '@turf/turf';
import { Position } from 'interfaces/geodata.interface';

type Polygon = GeoJSON.Feature<GeoJSON.Polygon>;
type Line = GeoJSON.Feature<GeoJSON.LineString>;

export const getNearest = (map: Map, polygon: Polygon) => {
  const bearing = map.getBearing() - 180;
  const startPoint = turf.centerOfMass(polygon!);
  const endPoint = turf.destination(startPoint, 1000, bearing);
  const exploded = turf.explode(polygon);
  const convex = turf.convex(exploded)!;
  const line = turf.polygonToLine(convex) as Line;
  const nearestPoint = turf.nearestPointOnLine(line, endPoint);
  return nearestPoint.geometry.coordinates as Position;
};

export const getIntersection = (map: Map, polygon: Polygon) => {
  const bearing = map.getBearing() - 180;
  const startPoint = turf.centerOfMass(polygon!);
  const endPoint = turf.destination(startPoint, 1000, bearing);
  const exploded = turf.explode(polygon);
  const convex = turf.convex(exploded)!;
  const line = turf.lineString([
    endPoint.geometry.coordinates,
    startPoint.geometry.coordinates
  ]);
  const intersects = turf.lineIntersect(convex, line);
  if (intersects.features.length === 0) debugger;
  return intersects.features[0].geometry.coordinates as Position;
};
