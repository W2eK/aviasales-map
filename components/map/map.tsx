import MapboxrGL from 'mapboxr-gl';
// @ts-ignore
// import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';
import { MapMarkers } from './map-markers';
import { MapPhotos } from './map-photos';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).__MAPBOXR_GL_DEBUG = true;
  (window as any).__MAPBOXR_GL_LOG = true;
}

export const MapContainer: FC = () => {
  return (
    <MapboxrGL
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
      wrapper={{ style: { height: '100vh' } }}
      maxPitch={60}
    >
      <MapMarkers />
      <MapPhotos />
    </MapboxrGL>
  );
};
