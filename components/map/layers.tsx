import { usePageContext } from 'context/page-context';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { CameraController } from './camera';
import { MapDistricts } from './districts';
import { MapLabels } from './labels';
import { MapMarker } from './marker';
import { MapPoi } from './poi';
import { MapVoronoi } from './voronoi';

export const MapLayers: FC = () => {
  const pageProps = usePageContext();
  const { query } = useRouter();
  return useMemo(() => {
    return pageProps.page !== 'index' && pageProps.geojson ? (
      <>
        <MapDistricts data={pageProps.geojson.districts} />
        <MapVoronoi data={pageProps.geojson.voronoi} />
        <MapPoi data={pageProps.geojson.poi} />
        <MapLabels data={pageProps.geojson.labels} />
        <MapMarker />
        <CameraController />
      </>
    ) : null;
  }, [query.city]);
};
