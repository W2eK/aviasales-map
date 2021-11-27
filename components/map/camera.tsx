import { FC, useEffect, useMemo } from 'react';
import { useMap } from 'mapboxr-gl';
import { MainPageContext, useStoreContext } from 'store/context';
import { MainPageProps } from 'interfaces/props.interface';
import { Map } from 'mapbox-gl';
import { CategoryCamera, CityCamera, PoiCamera } from 'components/camera';

const useCamera = (map: Map, pageProps: MainPageProps, padding: number) => {
  return useMemo(() => {
    if (pageProps.page === 'city') {
      return new CityCamera(map, pageProps);
    } else if (pageProps.page === 'category') {
      return new CategoryCamera(map, pageProps, padding);
    } else {
      return new PoiCamera(map, pageProps);
    }
  }, [map, pageProps, padding]);
};

export const CameraController: FC = () => {
  const { state } = useStoreContext() as MainPageContext;
  const { map } = useMap();
  const camera = useCamera(map, state.pageProps, state.sliderHeight);

  // INITIAL ANIMATION
  useEffect(() => {
    camera.jumpToInitial();
  }, []);

  // ANIMATION ON PAGE CHANGE
  useEffect(() => {
    if (camera.page === 'city' || camera.page === 'category') {
      if (state.hoverPoi !== null) {
        camera.flyToTarget(state.hoverPoi);
      } else {
        camera.flyToInitial();
      }
    }
  }, [state.pageProps]);

  // ANIMATION ON POI CHANGE
  useEffect(() => {
    if (state.isDragged || camera.page === 'poi') return;
    if (state.hoverPoi === null) {
      camera.flyToInitial();
    } else if (
      state.currentPoi === state.hoverPoi &&
      camera.page === 'category'
    ) {
      camera.zoomToTarget(state.currentPoi);
    } else {
      camera.flyToTarget(state.hoverPoi);
    }
  }, [state.hoverPoi]);

  // ANIMATION ON DISTRICT CHANGE
  useEffect(() => {
    if (
      !state.isDragged &&
      camera.page === 'category' &&
      state.hoverPoi === null
    ) {
      if (state.hoverDistrict === null) {
        camera.flyToInitial();
      } else {
        camera.flyToTarget(state.hoverDistrict);
      }
    }
  }, [state.hoverDistrict]);

  // ANIMATION ON SELECTED POI
  useEffect(() => {
    if (state.isDragged || camera.page !== 'category') return;
    if (state.currentPoi !== null) {
      if (state.currentPoi === state.hoverDistrict) {
        camera.zoomToDistrict(state.hoverDistrict);
      } else {
        camera.zoomToTarget(state.currentPoi);
      }
    } else if (state.hoverPoi !== null) {
      camera.flyToTarget(state.hoverPoi);
    } else if (state.hoverDistrict !== null) {
      camera.flyToTarget(state.hoverDistrict);
    } else if (state.hoverPoi === null) {
      camera.flyToInitial();
    }
  }, [state.currentPoi]);
  return null;
};
