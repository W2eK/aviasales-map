import { FC } from 'react';
import Image from 'next/image';
import { Feature } from './map-icons';
import { Marker } from 'mapboxr-gl';

type MapMarkerProps = {
  feature: Feature;
};

export const MapMarker: FC<MapMarkerProps> = ({ feature }) => {
  return (
    <Marker coordinates={feature.geometry.coordinates as [number, number]}>
      <div style={{ position: 'relative' }}>
        <Image
          key={feature.properties.id}
          src={feature.properties.image_url.replace(/\{\w*\}/g, '200')}
          width={75}
          height={75}
          alt="Avatar"
        />
        <div style={{ position: 'absolute' }}>{feature.properties.name}</div>
      </div>
    </Marker>
  );
};
