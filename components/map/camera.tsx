import { FC, useEffect } from 'react';
import { useMap } from 'mapboxr-gl';
import { ipApi } from 'services/ip-api';
import { usePageContext } from 'context/page-context';

export const CameraController: FC = () => {
  const pageProps = usePageContext();
  const { map } = useMap();
  useEffect(() => {
    if (pageProps.page === 'index') {
      ipApi.getLocation().then(({ lat, lon }) => {
        map.setCenter([lon, lat]);
      });
    } else if (pageProps.page === 'city') {
      map.jumpTo(pageProps.city.camera);
    }
  }, []);
  useEffect(() => {
    if (pageProps.page === 'city') {
      const { camera } = pageProps.city;
      map.flyTo(camera);
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
