import { FC, useEffect } from 'react';
import { Source, Layer } from 'mapboxr-gl';
import { DistrictsProps } from './props';

export const MapDistricts: FC<DistrictsProps> = ({ data }) => {
  return (
    data && (
      <Source id="districts" type="geojson" data={data}>
        <Layer master="districts-area" replaceMaster type="fill" sourceLayer='' />
        <Layer master="districts-line" replaceMaster type="line" sourceLayer='' />
        <Layer master="districts-halo" replaceMaster type="line" sourceLayer='' />
      </Source>
    )
  );
};
