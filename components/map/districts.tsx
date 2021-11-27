import { FC, useCallback, useMemo } from 'react';
import { Source, Layer, Property, Filter, LayerHandlers } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { setDistrictHover } from 'store/actions';
import { Center } from './center';
import { Expression } from 'mapbox-gl';
import { DistrictsGeojson } from 'interfaces/geodata.interface';

export interface DistrictsProps {
  data: DistrictsGeojson;
}

const DistrictsCenter = () => {
  const { state, dispatch } = useStoreContext();
  const handleDistricts =
    state.currentCategory === null || state.currentCategory === 'districts';

  const handler = useCallback(
    (features: DistrictsGeojson['features']) => {
      const [feature] = features;
      const id = !feature ? null : feature.properties.district_id;
      if (state.hoverDistrict !== id) {
        dispatch(setDistrictHover(id));
        // id && vibrate(10);
      }
    },
    [state.hoverDistrict]
  );
  return useMemo(
    () =>
      handleDistricts ? (
        <Center
          id={state.hoverDistrict}
          layers={['districts-area']}
          handler={handler}
          isDragged={state.isDragged}
          featureStateSource={['', 'labels']}
        />
      ) : null,
    [state.isDragged, handler, handleDistricts]
  );
};

const DistrictFilter: FC = () => {
  const { state } = useStoreContext();
  const isDistrictCurrent = state.currentCategory === 'districts';
  return useMemo(() => {
    const rule: Expression = isDistrictCurrent
      ? ['any', false]
      : [
          'case',
          ['==', ['get', 'district_id'], state.hoverDistrict],
          true,
          false
        ];
    return <Filter rule={rule} />;
  }, [state.hoverDistrict, isDistrictCurrent]);
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
        {/* <Layer
          master="districts-collisions"
          replaceMaster
          type="symbol"
          sourceLayer=""
        >
          <DistrictFilter />
        </Layer> */}
      </Source>
    )
  );
};
