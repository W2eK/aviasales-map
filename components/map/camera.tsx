import { FC, useEffect, useMemo } from 'react';
import { useMap } from 'mapboxr-gl';
import { MainPageContext, useStoreContext } from 'store/context';
import { MainPageProps } from 'interfaces/props.interface';
import { Map } from 'mapbox-gl';
import { CategoryCamera, CityCamera, PoiCamera } from 'components/camera';

const useCamera = (map: Map, pageProps: MainPageProps) => {
  return useMemo(() => {
    if (pageProps.page === 'city') {
      return new CityCamera(map, pageProps);
    } else if (pageProps.page === 'category') {
      return new CategoryCamera(map, pageProps);
    } else {
      return new PoiCamera(map, pageProps);
    }
  }, [map, pageProps]);
};

export const CameraController: FC = () => {
  const { state } = useStoreContext() as MainPageContext;
  const { map } = useMap();
  const page = state.pageProps.page;
  const camera = useCamera(map, state.pageProps);

  // INITIAL ANIMATION
  useEffect(() => {
    camera.jumpToInitial();
  }, []);

  // ANIMATION ON PAGE CHANGE
  useEffect(() => {
    switch (page) {
      case 'city': {
        if (state.hoverPoi !== null) {
          camera.flyToTarget(state.hoverPoi);
        } else {
          (camera as CityCamera).flyToInitial();
        }
        break;
      }
      case 'category': {
        (camera as CategoryCamera).flyToInitial();
        break;
      }
      case 'poi': {
        (camera as PoiCamera).flyToTarget();
      }
    }
  }, [state.pageProps]);

  // ANIMATION ON POI CHANGE
  useEffect(() => {
    if (state.isDragged) return;
    if (page === 'city' || page === 'category') {
      if (state.hoverPoi === null) {
        (camera as CityCamera | CategoryCamera).flyToInitial();
      } else {
        (camera as CityCamera | CategoryCamera).flyToTarget(state.hoverPoi);
      }
    }
  }, [state.hoverPoi]);

  // ANIMATION ON DISTRICT CHANGE
  useEffect(() => {
    if (state.isDragged || page !== 'category') return;
    if (state.hoverDistrict === null) {
      (camera as CategoryCamera).flyToInitial();
    } else {
      (camera as CategoryCamera).flyToTarget(state.hoverDistrict);
    }
  }, [state.hoverDistrict]);
  return null;
};
