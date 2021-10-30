/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import data from '../../../data/origins/points.json';
import { FC } from 'react';
import { Marker, Image, Layer } from 'mapboxr-gl';

export const MapPhotos: FC = ({}) => {
  const ids = [87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100];
  const images = ids.map(id => (
    <Image key={id} id={`${id}`} image={`/png/${id}.png`} />
  ));
  return (
    <>
      {images}
      <Layer
        id="photos"
        type="symbol"
        source="composite"
        sourceLayer="aviasales"
        filter={[
          'all',
          ['match', ['get', 'type'], ['poi'], true, false],
          ['match', ['get', 'category'], ['districts'], false, true],
          ['match', ['get', 'id'], ids, true, false]
        ]}
        layout={{
          'icon-image': ['to-string', ['get', 'id']],
          'icon-size': 0.35,
          'icon-offset': [0, -100],
          'icon-padding': 0,
          'icon-allow-overlap': true
        }}
      />
    </>
  );
};
