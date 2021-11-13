import { usePageContext } from 'context/page-context';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { MapDistricts } from './districts';
import { MapLabels } from './labels';
import { MapMarker } from './marker';
import { MapPoi } from './poi';
import { MapVoronoi } from './voronoi';

export const MapLayers: FC = () => {
  const pageProps = usePageContext();
  const { query } = useRouter();
  return useMemo(() => {
    return pageProps.page !== 'index' ? (
      <>
        <MapDistricts data={pageProps.geojson.districts} />
        <MapVoronoi data={pageProps.geojson.voronoi} />
        <MapPoi data={pageProps.geojson.poi} />
        <MapLabels data={pageProps.geojson.labels} />
        <MapMarker />
      </>
    ) : null;
  }, [query.city]);
};
