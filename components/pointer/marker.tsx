import { FC, useCallback, useMemo, useState } from 'react';
import { Marker } from 'mapboxr-gl';
import { Listener, MapHandlers } from 'mapboxr-gl';
import { Position } from 'interfaces/geodata.interface';
import { MapPointer } from './pointer';
import { degreesToRadians } from '@turf/turf';
import { MainPageContext, useStoreContext } from 'store/context';

export const PointerMarker: FC = () => {
  const { state } = useStoreContext() as MainPageContext;
  const [center, setCenter] = useState<Position | null>(null);
  const [scale, setScale] = useState(1);

  const isActive = !!state.hoverPoi || !!state.hoverDistrict;
  const isHidden =
    state.isDetailPage &&
    (state.index === -1 || state.index >= state.pageProps.order.length);
  // prettier-ignore
  const listener = useMemo(
    () => <Listener type="on" event="move" handler={({ target: map }) => {
      const center = map.getCenter().toArray() as Position;
      setCenter(center);
      const degree = map.getPitch();
      const radians = degreesToRadians(degree);
      setScale(Math.cos(radians));
    }} />, []);
  return (
    <>
      {listener}
      {center && (
        <Marker coordinates={center}>
          <MapPointer scale={scale} isActive={isActive} isHidden={isHidden} />
        </Marker>
      )}
    </>
  );
};
