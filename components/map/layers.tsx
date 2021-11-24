import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { MapHandlers } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { CameraController } from './camera';
import { MapDistricts } from './districts';
import { MapLabels } from './labels';
import { MapMarker } from './marker';
import { MapPoi } from './poi';
import { MapVoronoi } from './voronoi';
import { PoiParams } from 'pages/[city]/[category]/[poi]';
import { ClickHandlers } from './click';

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
        <MapMarker />
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
