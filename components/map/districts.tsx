import { FC, useEffect } from 'react';
import { Source, Layer, Property } from 'mapboxr-gl';
import { DistrictsProps } from './props';
import { useStoreState } from 'store/context';
import { setHover } from 'store/actions';
import { DistrictsCenter } from './districts-center';
import { Expression } from 'mapbox-gl';

export const MapDistricts: FC<DistrictsProps> = ({ data }) => {
  const colorRule: Expression = [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    '#0655fe',
    '#9ea9b7'
  ];

  return (
    data && (
      <Source id="districts" type="geojson" data={data} promoteId="district_id">
        <DistrictsCenter />
        <Layer master="districts-area" replaceMaster type="fill" sourceLayer="">
          <Property type="paint" name="fill-color" value={colorRule} />
        </Layer>
        <Layer master="districts-line" replaceMaster type="line" sourceLayer="">
          <Property type="paint" name="line-color" value={colorRule} />
        </Layer>
        <Layer master="districts-halo" replaceMaster type="line" sourceLayer="">
          <Property type="paint" name="line-color" value={colorRule} />
        </Layer>
      </Source>
    )
  );
};
