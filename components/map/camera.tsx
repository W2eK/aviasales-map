import { FC, useEffect } from 'react';
import { useMap } from 'mapboxr-gl';
import { ipApi } from 'services/ip-api';
import { usePageContext } from 'context/page-context';
import { useStoreContext } from 'store/context';
import { setDistrictHover, setMapLock } from 'store/actions';
import { CityPageProps } from 'pages/[city]';
import { LngLatLike } from 'mapbox-gl';

export const CameraController: FC = () => {
  const { state, dispatch } = useStoreContext();
  const pageProps = usePageContext();
  const { map } = useMap();
  // Initial
  useEffect(() => {
    if (pageProps.page === 'index') {
      ipApi.getLocation().then(({ lat, lon }) => {
        map.setCenter([lon, lat]);
      });
    } else if (pageProps.page === 'city') {
      map.jumpTo(pageProps.city!.camera);
    }
  }, []);

  // Others
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

  useEffect(() => {
    if (state.poiHover === null || state.isDragged) return;
    const center = (pageProps as CityPageProps).city?.poiGeojson.features.find(
      ({ properties }) => properties.id === state.poiHover
    )?.geometry.coordinates as LngLatLike;
    if (center) {
      const distance = map.project(map.getCenter()).dist(map.project(center));
      if (distance > 400) {
        map.flyTo({ center });
      } else {
        map.easeTo({ center });
      }
    }
  }, [state.poiHover]);

  // useEffect(() => {
  //   // if() const
  //   const bottom = state.isDragged ? 0 : 300;
  //   map.easeTo({ padding: { bottom, top: 0, left: 0, right: 0 } });
  // }, [state.isDragged]);
  return null;
};
