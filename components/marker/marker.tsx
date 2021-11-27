import { AnimatePresence } from 'framer-motion';
import { Position } from 'interfaces/geodata.interface';
import { LngLatLike } from 'mapbox-gl';
import { Marker as MapboxMarker } from 'mapboxr-gl';
import { FC, useRef } from 'react';

type MapboxMarkerProps = Parameters<typeof MapboxMarker>[0];
type MarkerProps = Omit<MapboxMarkerProps, 'coordinates'> & {
  coordinates: MapboxMarkerProps['coordinates'] | null;
};

export const Marker: FC<MarkerProps> = ({ children, coordinates, ...rest }) => {
  const prev = useRef<LngLatLike>([0, 0]);
  if (coordinates) prev.current = coordinates;
  return (
    <MapboxMarker coordinates={coordinates || prev.current} {...rest}>
      {children}
    </MapboxMarker>
  );
};
