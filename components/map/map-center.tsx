import { FC } from 'react';
import { Listener, MapHandlers } from 'mapboxr-gl';
import { DistrictsGeoJSON } from 'interfaces/districts.interface';
import { useStoreState } from 'store/context';
import { setHover } from 'store/actions';

export const MapCenter: FC = () => {
  const { state, dispatch } = useStoreState();

  const handler: MapHandlers['move'] = ({ target: map }) => {
    const center = map.getCenter();
    const [feature] = map.queryRenderedFeatures(map.project(center), {
      layers: ['districts-area']
    }) as any as DistrictsGeoJSON['features'];
    const id = !feature ? null : feature.properties.district_id
    if (state.hover !== id) {
      dispatch(setHover(id));
    }
  };
  return <Listener type="on" event="move" handler={handler} />;
};
