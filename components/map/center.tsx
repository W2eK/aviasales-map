import { Map } from 'mapbox-gl';
import { Listener, FeatureState, MapHandlers } from 'mapboxr-gl';
import { ReactElement } from 'react';

type CenterProps<T extends GeoJSON.Feature> = {
  id: number | null;
  handler: (features: T[], map: Map) => any;
  layers: string[];
  isDragged: boolean;
  featureStateSource?: string;
};
export const Center = <T extends GeoJSON.Feature>({
  id,
  handler,
  layers,
  isDragged,
  featureStateSource = ''
}: CenterProps<T>): ReactElement => {
  const queryFeatures: MapHandlers['move'] = ({ target: map }) => {
    const center = map.getCenter();
    const features = map.queryRenderedFeatures(map.project(center), {
      layers
    }) as any as T[];
    handler(features, map);
  };
  return (
    <>
      <FeatureState state={id} source={featureStateSource} />
      {isDragged ? (
        <Listener type="on" event="move" handler={queryFeatures} />
      ) : null}
    </>
  );
};
