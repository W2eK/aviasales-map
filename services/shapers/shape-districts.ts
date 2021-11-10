import fs from 'fs';
import {
  DistrictsGeojson,
  DistrictsProperties
} from 'interfaces/districts.interface';
import * as turf from '@turf/turf';
import { findSegment } from '@turf/turf';

export const getBufferedBbox = (
  features: GeoJSON.FeatureCollection,
  radius = 1
) => turf.bbox(turf.buffer(turf.bboxPolygon(turf.bbox(features)), radius));

export const shapeDistricts = (
  districts: DistrictsGeojson
): DistrictsGeojson => {
  const chunks = districts.features.reduce((arr, district) => {
    const chunk = turf.lineChunk(
      turf.polygonToLine(district),
      0.05
    ) as GeoJSON.FeatureCollection<GeoJSON.LineString, DistrictsProperties>;
    chunk.features.forEach(
      feature => (feature.properties = district.properties)
    );
    return arr.concat(chunk.features);
  }, [] as GeoJSON.Feature<GeoJSON.LineString, DistrictsProperties>[]);
  const points = turf.explode(turf.featureCollection(chunks));
  const bbox = getBufferedBbox(points);
  const voronoi = turf.voronoi(points, { bbox });
  voronoi.features.forEach(
    (feature, i) => (feature.properties = points.features[i].properties)
  );
  voronoi.features = voronoi.features.filter(Boolean);
  const dissolved = turf.dissolve(voronoi, { propertyName: 'district_id' });
  // console.log(JSON.stringify(points));
  fs.writeFileSync('../points.geojson', JSON.stringify(points));
  fs.writeFileSync('../districts.geojson', JSON.stringify(districts));
  fs.writeFileSync('../dissolved.geojson', JSON.stringify(dissolved));
  return districts;
};
