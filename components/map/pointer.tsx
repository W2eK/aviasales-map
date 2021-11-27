import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Marker } from 'mapboxr-gl';
import { Layer, Source, Listener, MapHandlers } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { point } from '@turf/turf';
import styled from 'styled-components';
import { Position } from 'interfaces/geodata.interface';
// Source.log = false;

const Pointer = styled.div`
  padding: 4px;
  background-color: var(--color-primary-800);
  border-radius: 50%;
  /* opacity: 0.3; */
`;

const PointerBorder = styled.div`
  background-color: rgba(6, 86, 254, 0.3);
  padding: 8px;
  transform: scaleY(0.6);
  border-radius: 50%;
`;

export const MapPointer: FC = () => {
  const [center, setCenter] = useState<Position | null>(null);
  const handler: MapHandlers['move'] = useCallback(({ target: map }) => {
    setCenter(map.getCenter().toArray() as Position);
  }, []);

  // prettier-ignore
  const listener = useMemo(
    () => <Listener type="on" event="move" handler={handler} />, [])
  return (
    <>
      {listener}
      {center && (
        <Marker coordinates={center}>
          <PointerBorder>
            <Pointer />
          </PointerBorder>
        </Marker>
      )}
    </>
  );
};
