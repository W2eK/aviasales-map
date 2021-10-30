import MapboxrGL, { Source, Terrain, Property } from 'mapboxr-gl';
// import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC } from 'react';
import { MapMarkers } from './map-markers';
import { MapPhotos } from './map-photos';
import { MapClusters } from './map-clusters';
import { useThrottle } from '../../hooks/use-delay';
import { MapIcons } from './map-icons';

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
      maxPitch={70}
      optimizeForTerrain={false}
    >
      {/* <MapMarkers /> */}
      <MapIcons />
      {/* <MapPhotos /> */}
      {/* <MapClusters /> */}
      <Source
        id="mapbox-dem"
        type="raster-dem"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
        tileSize={512}
        maxzoom={14}
      >
        <Terrain exaggeration={1.5} />
      </Source>
      {/* <Property type="layout" id="visibility" value="none" layer="districts-labels" /> */}
      <Property type="layout" id="visibility" value="none" layer="poi-halo" />
      <Property type="layout" id="visibility" value="none" layer="poi-circles" />
    </MapboxrGL>
  );
};
