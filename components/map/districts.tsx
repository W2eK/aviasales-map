import { FC, useEffect } from 'react';
import { Source, Layer, Property } from 'mapboxr-gl';
import { useStoreState } from 'store/context';
import { setDistrictHover, setPoiType } from 'store/actions';
import { Center } from './center';
import { Expression } from 'mapbox-gl';
import { DistrictsPolygonsGeojson } from 'interfaces/districts.interface';
import { vibrate } from 'services/vibration';

export interface DistrictsProps {
  data: DistrictsPolygonsGeojson;
}

const DistrictsCenter = () => {
  const { state, dispatch } = useStoreState();
  const handler = (features: DistrictsPolygonsGeojson['features']) => {
    const [feature] = features;
    const id = !feature ? null : feature.properties.district_id;
    if (state.districtHover !== id) {
      dispatch(setDistrictHover(id));
      id && vibrate(20);
    }
  };
  return (
    <Center
      id={state.districtHover}
      layers={['districts-area']}
      handler={handler}
    />
  );
};


export const MapDistricts: FC<DistrictsProps> = ({ data }) => {
  const colorRule: Expression = [
    'case',
    ['boolean', ['feature-state', 'active'], false],
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
