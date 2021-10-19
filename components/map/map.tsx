import dynamic from 'next/dynamic';
import MapboxrGL from 'mapboxr-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';

if (process.env.NODE_ENV === 'development' && window !== undefined) {
  (window as any).__MAPBOXR_GL_DEBUG = true;
  (window as any).__MAPBOXR_GL_LOG = true;
}

export const MapContainer: FC = () => {
  return (
    <MapboxrGL
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      wrapper={{ style: { height: '100vh' } }}
    />
  );
};
