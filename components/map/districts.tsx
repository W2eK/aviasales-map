import { FC, useCallback, useEffect, useMemo } from 'react';
import { Source, Layer, Property, Filter } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { setDistrictHover, setPoiType } from 'store/actions';
import { Center } from './center';
import { Expression } from 'mapbox-gl';
import { DistrictsGeojson } from 'interfaces/geodata.interface';
import { vibrate } from 'services/vibration';

export interface DistrictsProps {
  data: DistrictsGeojson;
}

const DistrictsCenter = () => {
  const { state, dispatch } = useStoreContext();
  const handler = useCallback(
    (features: DistrictsGeojson['features']) => {
      const [feature] = features;
      const id = !feature ? null : feature.properties.district_id;
      if (state.districtHover !== id) {
        dispatch(setDistrictHover(id));
        // id && vibrate(10);
      }
    },
    [state.districtHover]
  );
  return useMemo(
    () => (
      <Center
        id={state.districtHover}
        layers={['districts-area']}
        handler={handler}
        isDragged={state.isDragged}
      />
    ),
    [state.isDragged, handler]
  );
};

const DistrictFilter: FC = () => {
  const { state } = useStoreContext();
  return useMemo(() => {
    const rule: Expression = [
      'case',
      ['==', ['get', 'district_id'], state.districtHover],
      true,
      false
    ];
    return <Filter rule={rule} />;
  }, [state.districtHover]);
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
        <Layer
          master="districts-collisions"
          replaceMaster
          type="symbol"
          sourceLayer=""
        >
          <DistrictFilter />
        </Layer>
      </Source>
    )
  );
};
