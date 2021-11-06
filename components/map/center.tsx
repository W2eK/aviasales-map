import { Listener, FeatureState, MapHandlers } from 'mapboxr-gl';
import { ReactElement } from 'react';

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
      <Listener type="on" event="move" handler={queryFeatures} />
    </>
  );
};
