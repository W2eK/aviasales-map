import { FC, useMemo } from 'react';
import { Marker as MapboxMarker } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { MainPageProps } from 'interfaces/city.interface';
import { Marker } from 'components/marker';

export const MapMarker: FC = () => {
  let { state, pageProps } = useStoreContext();
  pageProps = pageProps as MainPageProps;
  const poi = state.poiHover !== null ? pageProps.poi?.[state.poiHover] : null;
  return useMemo(
    () =>
      poi && (
        <MapboxMarker
          coordinates={poi.camera.center}
          offset={[0, -40]}
          anchor="bottom"
        >
          <Marker poi={poi} />
        </MapboxMarker>
      ),
    [state.poiHover]
  );
};
