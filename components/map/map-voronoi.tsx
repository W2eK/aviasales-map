import { FC } from 'react';
import * as turf from '@turf/turf';
import { Layer, Source, Property, Filter, Listener } from 'mapboxr-gl';
import { poi } from '../../data/poi';
import { featureCollection } from '@turf/turf';

const filtered = featureCollection(
  poi.features.filter(({ properties }) => properties.category === 'famous')
);

const bbox = turf.bbox(turf.buffer(turf.bboxPolygon(turf.bbox(filtered)), 1));
const voronoi = turf.voronoi(filtered, { bbox });
voronoi.features.forEach((feature, i) => {
  feature.properties = filtered.features[i].properties;
});
// console.log(turf.bbox)

export const MapVoronoi: FC = () => {
  console.log(voronoi);
  return (
    <Source data={voronoi} type="geojson" id="voronoi">
      <Layer
        id="voronoi-fill"
        type="fill"
        paint={{
          'fill-color': 'rgba(0,0,0,.03)',
          'fill-opacity': 0,
          'fill-outline-color': 'white'
        }}
      >
        {/* <Listener type='on' event=''> */}
      </Layer>
    </Source>
  );
};
