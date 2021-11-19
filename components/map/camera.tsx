import { FC, useEffect, useRef } from 'react';
import { useMap } from 'mapboxr-gl';
import { ipApi } from 'services/ip-api';
import { useStoreContext } from 'store/context';
import { resetState, setDistrictHover, setMapLock } from 'store/actions';
import { MainPageProps } from 'interfaces/city.interface';
import { FlyToOptions } from 'mapbox-gl';

export const CameraController: FC = () => {
  const { state, dispatch, pageProps } = useStoreContext();
  const { map } = useMap();
  const initial = useRef(true);
  const prev = useRef(pageProps.page);
  // Initial
  useEffect(() => {
    switch (pageProps.page) {
      // case 'index': {
      //   ipApi.getLocation().then(({ lat, lon }) => {
      //     map.setCenter([lon, lat]);
      //   });
      //   break;
      // }
      case 'city': {
        const bounds = map.cameraForBounds(pageProps.bounds)!;
        bounds.zoom = Math.min(bounds.zoom, 12);
        map.jumpTo(bounds);
        break;
      }
      case 'category': {
        const bounds = map.cameraForBounds(pageProps.bounds)!;
        bounds.zoom = Math.min(bounds.zoom);
        map.jumpTo(bounds);
        break;
      }
      case 'poi': {
        const center = pageProps.camera.center;
        map.jumpTo({ center, zoom: 11 });
      }
      default:
        break;
    }
  }, []);

  // On Page Change
  useEffect(() => {
    switch (pageProps.page) {
      case 'city': {
        const camera = pageProps.camera;
        if (initial.current) {
          setTimeout(() => map.flyTo({...camera, duration: 3000}), 2000);
        } else {
          map.flyTo(camera);
        }
        break;
      }
      case 'category': {
        const bounds = map.cameraForBounds(pageProps.bounds)!;
        map.flyTo(bounds);
        break;
      }
      case 'poi': {
        const camera = pageProps.camera;
        map.flyTo(camera);
        break;
      }
      default:
        break;
    }
    initial.current = false;
    // if (pageProps.page === 'city') {
    //   // if (pageProps.city) dispatch(setDistrictHover(pageProps.city.id));
    //   const { camera } = pageProps;
    //   map.flyTo(camera, { locked: true });
    //   dispatch(setMapLock(true));
    //   map.once('moveend', () => {
    //     dispatch(setMapLock(false));
    //   });
    // } else if (pageProps.page === 'index') {
    //   dispatch(resetState());
    //   map.flyTo({
    //     pitch: 0,
    //     zoom: 8,
    //     bearing: 0
    //   });
    // }
  }, [pageProps]);

  useEffect(() => {
    // if (state.poiHover === null || state.isDragged) return;
    // const center = (pageProps as CityPageProps).poi[state.poiHover].camera
    //   .center;
    // const distance = map.project(map.getCenter()).dist(map.project(center));
    // if (distance > 400) {
    //   map.flyTo({ center });
    // } else {
    //   map.easeTo({ center });
    // }
  }, [state.poiHover]);

  return null;
};
