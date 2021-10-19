import dynamic from 'next/dynamic';
import { MapContainer } from './map';

const DynamicMapContainer = dynamic(() => Promise.resolve(MapContainer), {
  ssr: false
});

export { DynamicMapContainer as MapContainer };
