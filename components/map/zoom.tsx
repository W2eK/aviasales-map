import { FC } from 'react';
import { Listener, FeatureState, MapHandlers } from 'mapboxr-gl';

export const MapZoom: FC = () => {
  const handler: MapHandlers['drag'] = ({ target: map, ignore }) => {
    if (ignore) return;
    const max = 1300;
    const min = 500;
    const center = map.getCenter();
    const elevation = map.queryTerrainElevation(center)!;
    const ratio = (1 - (elevation - min) / (max - min)) * 2;
    console.log(elevation, 13 + ratio);
    // map.setZoom(13 + ratio, { ignore: true });
  };
  return <Listener type="on" event="drag" handler={handler} />;
};
