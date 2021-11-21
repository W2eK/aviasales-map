import { FC, useMemo } from 'react';
import { MainPageContext, useStoreContext } from 'store/context';
import { MainPageState } from 'store/state';
import { CameraController } from './camera';
import { MapDistricts } from './districts';
import { MapLabels } from './labels';
import { MapMarker } from './marker';
import { MapPoi } from './poi';
import { MapVoronoi } from './voronoi';

export const MapLayers: FC = () => {
  const { state } = useStoreContext();
  return useMemo(() => {
    return state.isMainPage ? (
      <>
        <MapDistricts data={state.pageProps.geojson.districts} />
        <MapVoronoi data={state.pageProps.geojson.voronoi} />
        <MapPoi data={state.pageProps.geojson.poi} />
        <MapLabels data={state.pageProps.geojson.labels} />
        <MapMarker />
        <CameraController />
      </>
    ) : null;
  }, [state.currentCity]);
};
