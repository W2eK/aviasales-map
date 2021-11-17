import { FC, useMemo } from 'react';
import { Marker as MapboxMarker } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { usePageContext } from 'context/page-context';
import { CityPageProps } from 'interfaces/city.interface';
import { Marker } from 'components/marker';

export const MapMarker: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  const poi = state.poiHover !== null ? pageProps.poi[state.poiHover] : null;
  return useMemo(
    () =>
      poi && (
        <MapboxMarker
          coordinates={poi.camera.center}
          offset={[0, -40]}
          anchor="bottom"
        >
          <Marker poi={poi} isDragged={state.isDragged} />
        </MapboxMarker>
      ),
    [state.poiHover, state.isDragged]
  );
};
