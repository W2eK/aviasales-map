import { FC } from 'react';
import { Listener, FeatureState, MapHandlers } from 'mapboxr-gl';
import { DistrictsGeoJSON } from 'interfaces/districts.interface';
import { useStoreState } from 'store/context';
import { setHover } from 'store/actions';
import { vibrate } from 'services/vibration';

// prettier-ignore
const getChanges = (a: number, b: number): [number, { hover: boolean }][] =>
  a !== b ? [[a, {hover: false}], [b, {hover: true}]] : []

export const DistrictsCenter: FC = () => {
  const { state, dispatch } = useStoreState();

  const handler: MapHandlers['move'] = ({ target: map }) => {
    const center = map.getCenter();
    const [feature] = map.queryRenderedFeatures(map.project(center), {
      layers: ['districts-area']
    }) as any as DistrictsGeoJSON['features'];
    const id = !feature ? null : feature.properties.district_id;
    if (state.districtHover !== id) {
      dispatch(setHover(id));
      vibrate(10)
    }
  };
  return (
    <>
      <FeatureState state={state.districtHover || -1} getChanges={getChanges} />
      <Listener type="on" event="move" handler={handler} />
    </>
  );
};
