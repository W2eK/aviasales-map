import { Listener, Terrain, MapHandlers } from 'mapboxr-gl';
import { FC, useCallback, useState } from 'react';
import { useStoreContext } from 'store/context';

export const MapTerrain: FC = () => {
  // const { state } = useStoreState();
  const [showTerrain, setShowTerrain] = useState(false);

  const handler: MapHandlers['zoom'] = useCallback(
    ({ target: map }) => {
      const zoomIsLarge = map.getZoom() >= 7;
      if (showTerrain !== zoomIsLarge) setShowTerrain(zoomIsLarge);
    },
    [showTerrain]
  );
  return (
    <>
      <Listener type="on" event="zoom" handler={handler} />
      {showTerrain && <Terrain exaggeration={1.5} />}
    </>
  );
};
