import { FC, useEffect } from 'react';
import { Source, Layer } from 'mapboxr-gl';
import { DistrictsProps } from './props';
import { useStoreState } from 'store/context';
import { setHover } from 'store/actions';
import { MapCenter } from './map-center';

export const MapDistricts: FC<DistrictsProps> = ({ data }) => {
  return (
    data && (
      <Source id="districts" type="geojson" data={data}>
        <MapCenter />
        <Layer master="districts-area" replaceMaster type="fill" sourceLayer='' />
        <Layer master="districts-line" replaceMaster type="line" sourceLayer='' />
        <Layer master="districts-halo" replaceMaster type="line" sourceLayer='' />
      </Source>
    )
  );
};
