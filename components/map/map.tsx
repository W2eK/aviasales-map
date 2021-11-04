import MapboxrGL, { Source, Terrain, Property } from 'mapboxr-gl';
// import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useEffect, useState } from 'react';
import { MapMarkers } from './map-markers';
import { MapPhotos } from './map-photos';
import { MapClusters } from './map-clusters';
import { useThrottle } from '../../hooks/use-delay';
import { MapIcons } from './map-icons';
import { MapVoronoi } from './map-voronoi';
import { useRouter } from 'next/router';
import { MapContainerProps } from './props';
import { CameraController } from './camera-contoller';
import { MapDistricts } from './districts';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).__MAPBOXR_GL_DEBUG = true;
  (window as any).__MAPBOXR_GL_LOG = true;
}

const center: [[number, number], [number, number]] = [
  [44.80157, 41.6938],
  [44.80157, 41.6938]
];

const MapContainer: FC<MapContainerProps> = pageProps => {
  return (
    <MapboxrGL
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
      wrapper={{ style: { height: '100%' } }}
      maxPitch={70}
      zoom={8}
      // showOverdrawInspector
    >
      <CameraController {...pageProps} />
      <MapDistricts
        data={pageProps.page === 'city' ? pageProps.districts : null}
      />
      {/* <MapMarkers /> */}
      {/* <MapVoronoi /> */}
      {/* <MapIcons /> */}
      {/* <MapPhotos /> */}
      {/* <MapClusters /> */}
      <Source
        id="mapbox-dem"
        type="raster-dem"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
        tileSize={512}
        maxzoom={14}
      >
        {/* <Terrain exaggeration={1.5} /> */}
      </Source>
      {/* <Property type="layout" id="visibility" value="none" layer="districts-labels" /> */}
      <Property type="layout" id="visibility" value="none" layer="poi-halo" />
      <Property
        type="layout"
        id="visibility"
        value="none"
        layer="poi-circles"
      />
      {/* <Property
        type="layout"
        id="visibility"
        value="none"
        layer="districts-labels"
      /> */}
    </MapboxrGL>
  );
};

export default MapContainer;
