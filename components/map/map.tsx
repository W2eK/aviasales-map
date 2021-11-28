import MapboxrGL, { Source, Property } from 'mapboxr-gl';
// import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { MapVoronoi } from './voronoi';
import { CameraController } from './camera';
import { MapDistricts } from './districts';
import { MapPoi } from './poi';
import { LazyImages } from './lazy-images';
// import { MapPointer } from './pointer';
import { MapTerrain } from './terrain';
import { MapLabels } from './labels';
import { MapZoom } from './zoom';
import { MapDragState } from './drag';
import { MapLayers } from './layers';
import { PointerMarker } from '../pointer';
import { useStoreContext } from 'store/context';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).__MAPBOXR_GL_DEBUG = true;
  (window as any).__MAPBOXR_GL_LOG = false;
}

const MapContainer: FC = () => {
  const {
    state: { mapLocked }
  } = useStoreContext();

  // (window as any).pageProps = pageProps;
  return useMemo(() => {
    return (
      <MapboxrGL
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
        wrapper={{ style: { height: '100%', backgroundColor: 'var(--color-ink-50)' } }}
        maxPitch={70}
        center={[15, 50]}
        zoom={3}
        padding={{ top: 0, bottom: 100 }}
        interactive={false}
        scrollZoom={!mapLocked}
        boxZoom={!mapLocked}
        dragRotate={!mapLocked}
        dragPan={!mapLocked}
        keyboard={!mapLocked}
        doubleClickZoom={!mapLocked}
        touchZoomRotate={!mapLocked}
        // showPadding
      >
        <MapLayers />
        <LazyImages />
        <PointerMarker />
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        >
          {/* <MapTerrain /> */}
        </Source>
        <Property
          type="layout"
          name="visibility"
          value="none"
          layer="poi-halo"
        />
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
  }, [mapLocked]);
};

export default memo(MapContainer);
