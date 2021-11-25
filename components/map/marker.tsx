import { FC, useMemo } from 'react';
import { Marker as MapboxMarker } from 'mapboxr-gl';
import { MainPageContext, useStoreContext } from 'store/context';
import { Marker } from 'components/marker';

export const MapMarker: FC = () => {
  let { state } = useStoreContext() as MainPageContext;
  const poi =
    state.hoverPoi !== null ? state.pageProps.poi?.[state.hoverPoi] : null;
  return useMemo(
    () => (
      <MapboxMarker
        coordinates={poi?.camera.center || [0, 0]}
        offset={[0, -60]}
        anchor="bottom"
      >
        <Marker poi={poi} />
      </MapboxMarker>
    ),
    [state.hoverPoi]
  );
};
