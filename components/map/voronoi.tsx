import { FC } from 'react';
import { Source, Layer } from 'mapboxr-gl';
import { VoronoiProps } from './props';



export const MapVoronoi: FC<VoronoiProps> = ({ data }) => {
  // @ts-ignore
  window.voronoi = data;
  return (
    <Source id="voronoi" type="geojson" data={data} promoteId="id">
      <Layer
        id="voronoi-fill"
        type="fill"
        paint={{
          'fill-color': 'rgba(0, 0, 0, 0.01)',
          'fill-outline-color': 'white'
        }}
      />
    </Source>
  );
};
