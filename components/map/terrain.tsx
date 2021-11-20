import { Listener, Terrain, MapHandlers } from 'mapboxr-gl';
import { FC, useCallback, useState } from 'react';

export const MapTerrain: FC = () => {
  // const { state } = useStoreState();
  const [showTerrain, setShowTerrain] = useState(false);

  const handler: MapHandlers['zoom'] = useCallback(
    ({ target: map }) => {
      const zoomIsLarge = map.getZoom() >= 11;
      // const zoomIsLarge = true;
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
