import { Listener, FeatureState, MapHandlers } from 'mapboxr-gl';
import { ReactElement } from 'react';
import { useStoreState } from 'store/context';

type CenterProps<T extends GeoJSON.Feature> = {
  id: number | null;
  handler: (features: T[]) => any;
  layers: string[];
};
export const Center = <T extends GeoJSON.Feature>({
  id,
  handler,
  layers
}: CenterProps<T>): ReactElement => {
  const { state } = useStoreState();
  const queryFeatures: MapHandlers['move'] = ({ target: map, test }) => {
    const center = map.getCenter();
    const features = map.queryRenderedFeatures(map.project(center), {
      layers
    }) as any as T[];
    handler(features);
  };
  return (
    <>
      <FeatureState state={id} />
      {!state.mapLocked ? (
        <Listener type="on" event="move" handler={queryFeatures} />
      ): null}
    </>
  );
};
