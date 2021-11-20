import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import { CameraController } from './camera';
import { MapDistricts } from './districts';
import { MapLabels } from './labels';
import { MapMarker } from './marker';
import { MapPoi } from './poi';
import { MapVoronoi } from './voronoi';

export const MapLayers: FC = () => {
  const { state, pageProps } = useStoreContext();
  return useMemo(() => {
    return 'geojson' in pageProps ? (
      <>
        <MapDistricts data={pageProps.geojson.districts} />
        <MapVoronoi data={pageProps.geojson.voronoi} />
        <MapPoi data={pageProps.geojson.poi} />
        <MapLabels data={pageProps.geojson.labels} />
        <MapMarker />
        <CameraController />
      </>
    ) : null;
  }, [state.currentCity]);
};
