import { FC, useEffect, useRef } from 'react';
import { useMap } from 'mapboxr-gl';
import { ipApi } from 'services/ip-api';
import { MainPageContext, useStoreContext } from 'store/context';
import { resetState, setDistrictHover, setMapLock } from 'store/actions';
import { MainPageProps } from 'interfaces/props.interface';
import { FlyToOptions, PaddingOptions } from 'mapbox-gl';

export const CameraController: FC = () => {
  const { state, dispatch } = useStoreContext() as MainPageContext;
  const { map } = useMap();
  const initial = useRef(true);
  const prev = useRef(state.pageProps.page);

  // Initial
  // useEffect(() => {
  //   switch (pageProps.page) {
  //     // case 'index': {
  //     //   ipApi.getLocation().then(({ lat, lon }) => {
  //     //     map.setCenter([lon, lat]);
  //     //   });
  //     //   break;
  //     // }
  //     case 'city': {
  //       const bounds = map.cameraForBounds(pageProps.bounds)!;
  //       bounds.zoom = Math.min(bounds.zoom, 12);
  //       // map.
  //       map.jumpTo({ ...bounds, bearing: 0, pitch: 0 });
  //       // map.triggerRepaint();
  //       break;
  //     }
  //     case 'category': {
  //       const bounds = map.cameraForBounds(pageProps.bounds)!;
  //       bounds.zoom = Math.min(bounds.zoom);
  //       map.jumpTo(bounds);
  //       break;
  //     }
  //     case 'poi': {
  //       const center = pageProps.camera.center;
  //       map.jumpTo({ center, zoom: 11 });
  //     }
  //     default:
  //       break;
  //   }
  // }, []);

  // // On Page Change
  // useEffect(() => {
  //   switch (pageProps.page) {
  //     case 'city': {
  //       const camera = pageProps.camera;
  //       if (initial.current) {
  //         setTimeout(() => map.flyTo({ ...camera, duration: 3000 }), 1000);
  //       } else {
  //         // @ts-ignore
  //         const padding: PaddingOptions = { bottom: 100 };
  //         map.flyTo({ ...camera, padding });
  //       }
  //       break;
  //     }
  //     case 'category': {
  //       const bounds = map.cameraForBounds(pageProps.bounds, {
  //         pitch: map.getPitch(),
  //         bearing: map.getBearing(),
  //         padding: { top: 40, bottom: 100, left: 40, right: 40 }
  //       })!;
  //       // @ts-ignore
  //       const padding: PaddingOptions = { bottom: 352 };
  //       map.flyTo({ ...bounds, padding });
  //       break;
  //     }
  //     case 'poi': {
  //       const camera = pageProps.camera;
  //       map.flyTo(camera);
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  //   initial.current = false;
  //   // if (pageProps.page === 'city') {
  //   //   // if (pageProps.city) dispatch(setDistrictHover(pageProps.city.id));
  //   //   const { camera } = pageProps;
  //   //   map.flyTo(camera, { locked: true });
  //   //   dispatch(setMapLock(true));
  //   //   map.once('moveend', () => {
  //   //     dispatch(setMapLock(false));
  //   //   });
  //   // } else if (pageProps.page === 'index') {
  //   //   dispatch(resetState());
  //   //   map.flyTo({
  //   //     pitch: 0,
  //   //     zoom: 8,
  //   //     bearing: 0
  //   //   });
  //   // }
  // }, [pageProps]);

  // useEffect(() => {
  //   if (state.isDragged) return;
  //   if (state.hoverPoi !== null) {
  //     const center = pageProps.poi[state.hoverPoi].camera.center;
  //     const distance = map.project(map.getCenter()).dist(map.project(center));
  //     if (distance > 400) {
  //       map.flyTo({ center });
  //     } else {
  //       map.easeTo({ center });
  //     }
  //   } else {

  //   }
  // }, [state.hoverPoi]);

  return null;
};
