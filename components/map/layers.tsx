import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import { CameraController } from './camera';
import { MapDistricts } from './districts';
import { MapLabels } from './labels';
import { MapPoi } from './poi';
import { MapVoronoi } from './voronoi';
import { ClickHandlers } from './click';
import { DistrictMarker, PoiMarker } from 'components/marker';

// prettier-ignore
export const MapLayers: FC = () => {
  const { state } = useStoreContext();

  const voronoi = useMemo(() =>
    state.isMainPage ? (
      <MapVoronoi data={state.pageProps.geojson.voronoi} />
    ) : null,
  [state.currentCity, state.currentCategory]);

  const layers = useMemo(() =>
    state.isMainPage ? (
      <>
        <MapDistricts data={state.pageProps.geojson.districts} />
        <MapPoi data={state.pageProps.geojson.poi} />
        <MapLabels data={state.pageProps.geojson.labels} />
        <DistrictMarker />
        <PoiMarker />
        <CameraController />
        <ClickHandlers/>
      </>
    ) : null,
  [state.currentCity]);

  return (
    <>
      {voronoi}
      {layers}
    </>
  );
};
