import { FC, useEffect } from 'react';
import { useMap } from 'mapboxr-gl';
import { MapContainerProps } from './props';
import { ipApi } from 'services/ip-api';

export const CameraController: FC<MapContainerProps> = pageProps => {
  const { map } = useMap();
  useEffect(() => {
    if (pageProps.page !== 'index') return;
    ipApi.getLocation().then(({ lat, lon }) => {
      map.setCenter([lon, lat]);
    });
  }, []);
  useEffect(() => {
    if (pageProps.page === 'city') {
      const { longitude, latitude } = pageProps.cityMap.start_point;
      const { start_zoom } = pageProps.cityMap;
      const zoom = Math.min(11, start_zoom);
      const bearing = 30 - Math.random() * 60;
      map.flyTo({
        center: [longitude, latitude],
        zoom,
        pitch: 50,
        bearing
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
