import MapboxrGL, { Source, Property } from 'mapboxr-gl';
// import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useEffect, useState } from 'react';
import { MapVoronoi } from './voronoi';
import { CameraController } from './camera';
import { MapDistricts } from './districts';
import { MapPoi } from './poi';
import { LazyImages } from './lazy-images';
import { usePageContext } from 'context/page-context';
// import { MapPointer } from './pointer';
import { MapTerrain } from './terrain';
import { MapLabels } from './labels';
import { MapZoom } from './zoom';
import { MapDragState } from './drag';
import { MapMarker } from './marker';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).__MAPBOXR_GL_DEBUG = true;
  (window as any).__MAPBOXR_GL_LOG = true;

}

const center: [[number, number], [number, number]] = [
  [44.80157, 41.6938],
  [44.80157, 41.6938]
];

const MapContainer: FC = () => {
  const pageProps = usePageContext();
  // (window as any).pageProps = pageProps;
  return (
    <MapboxrGL
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
      wrapper={{ style: { height: '100%' } }}
      maxPitch={70}
      center={[15, 50]}
      zoom={3}
      padding={{ top: 0, bottom: 100 }}
      showPadding
    >
      <CameraController />
      {pageProps.page === 'city' && pageProps.city && pageProps.districts ? (
        <>
          <MapDistricts data={pageProps.districts} />
          <MapVoronoi data={pageProps.city.voronoiGeojson} />
          <MapPoi data={pageProps.city.poiGeojson} />
          <MapLabels data={pageProps.city.labelsGeojson} />
          <MapMarker />
        </>
      ) : null}
      <LazyImages />
      {/* <MapPointer /> */}
      <Source
        id="mapbox-dem"
        type="raster-dem"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
        tileSize={512}
        maxzoom={14}
      >
        <MapTerrain />
      </Source>
      <Property type="layout" name="visibility" value="none" layer="poi-halo" />
      <Property
        type="layout"
        name="visibility"
        value="none"
        layer="poi-circles"
      />
      <MapDragState />
      {/* <MapZoom /> */}
    </MapboxrGL>
  );
};

export default MapContainer;
