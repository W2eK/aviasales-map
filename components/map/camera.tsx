import { FC, useEffect } from 'react';
import { useMap } from 'mapboxr-gl';
import { ipApi } from 'services/ip-api';
import { usePageContext } from 'context/page-context';
import { useStoreContext } from 'store/context';
import { setDistrictHover, setMapLock } from 'store/actions';

export const CameraController: FC = () => {
  const { dispatch } = useStoreContext();
  const pageProps = usePageContext();
  const { map } = useMap();
  useEffect(() => {
    if (pageProps.page === 'index') {
      ipApi.getLocation().then(({ lat, lon }) => {
        map.setCenter([lon, lat]);
      });
    } else if (pageProps.page === 'city') {
      map.jumpTo(pageProps.city!.camera);
    }
  }, []);
  useEffect(() => {
    if (pageProps.page === 'city') {
      if (pageProps.city) dispatch(setDistrictHover(pageProps.city.id));
      const { camera } = pageProps.city!;
      map.flyTo(camera, { locked: true });
      dispatch(setMapLock(true));
      map.once('moveend', () => {
        dispatch(setMapLock(false));
      });
    } else if (pageProps.page === 'index') {
      map.flyTo({
        pitch: 0,
        zoom: 8,
        bearing: 0
      });
    }
  }, [pageProps]);
  return null;
};
