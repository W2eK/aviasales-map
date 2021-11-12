import { Listener, FeatureState, MapHandlers } from 'mapboxr-gl';
import { ReactElement } from 'react';

type CenterProps<T extends GeoJSON.Feature> = {
  id: number | null;
  handler: (features: T[]) => any;
  layers: string[];
  isDragged: boolean;
};
export const Center = <T extends GeoJSON.Feature>({
  id,
  handler,
  layers,
  isDragged
}: CenterProps<T>): ReactElement => {
  const queryFeatures: MapHandlers['move'] = ({ target: map }) => {
    const center = map.getCenter();
    const features = map.queryRenderedFeatures(map.project(center), {
      layers
    }) as any as T[];
    handler(features);
  };
  return (
    <>
      <FeatureState state={id} />
      {isDragged ? (
        <Listener type="on" event="move" handler={queryFeatures} />
      ) : null}
    </>
  );
};
