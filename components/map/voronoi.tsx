import { FC } from 'react';
import { Source, Layer } from 'mapboxr-gl';
import { VoronoiGeojson } from 'interfaces/city.interface';

export interface VoronoiProps {
  data: VoronoiGeojson;
}

export const MapVoronoi: FC<VoronoiProps> = ({ data }) => {
  // @ts-ignore
  window.voronoi = data;
  return (
    <Source id="voronoi" type="geojson" data={data} promoteId="id">
      <Layer
        id="voronoi-fill"
        type="fill"
        paint={{
          'fill-opacity': 0
          // 'fill-color': 'rgba(0, 0, 0, 0.01)',
          // 'fill-outline-color': 'white'
        }}
      />
    </Source>
  );
};
