import { FC } from 'react';
import { Marker as MapboxMarker } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { usePageContext } from 'context/page-context';
import { CityPageProps } from 'pages/[city]';
import { Marker } from 'components/marker';

export const MapMarker: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  const poiFeature =
    pageProps.city?.poiGeojson.features.find(
      ({ properties }) => properties.id === state.poiHover
    ) || null;
  const poi =
    pageProps.city?.poi.find(({ id }) => id === state.poiHover) || null;
  return (
    poi &&
    poiFeature && (
      <MapboxMarker
        coordinates={poiFeature.geometry.coordinates as [number, number]}
        offset={[0, -40]}
        anchor="bottom"
      >
        <Marker poi={poi} dragged={state.isDragged} />
      </MapboxMarker>
    )
  );
};
