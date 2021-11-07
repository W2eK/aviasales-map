import { FC, useCallback, useEffect, useState } from 'react';
import { Layer, Source, Listener, MapHandlers } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { point } from '@turf/turf';
// Source.log = false;

type PointerFeature = GeoJSON.Feature<GeoJSON.Point>;

export const MapPointer: FC = () => {
  const { state } = useStoreContext();
  const [pointer, setPointer] = useState<PointerFeature | null>(null);
  const handler: MapHandlers['move'] = useCallback(({ target: map }) => {
    const center = map.getCenter().toArray();
    setPointer(point(center));
  }, []);
  return !state.mapLocked ? (
    <>
      <Listener type="on" event="move" handler={handler} />
      {pointer && (
        <Source id="pointer" type="geojson" data={pointer}>
          <Layer id="pointer-circle" type="circle" />
        </Source>
      )}
    </>
  ) : null;
};
