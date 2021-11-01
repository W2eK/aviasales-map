import data from '../../data/poi.json';
import { featureCollection } from '@turf/turf';

type Data = GeoJSON.FeatureCollection<
  GeoJSON.Point,
  typeof data['features'][number]['properties']
>;

export const poi = featureCollection(
  (data as Data).features.filter(
    ({ properties }) => properties.category !== 'districts'
  )
);
