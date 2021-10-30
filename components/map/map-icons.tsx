/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import data from '../../../data/origins/points.json';
import { FC } from 'react';
import { Marker, Image, Layer } from 'mapboxr-gl';

export const MapIcons: FC = ({}) => {
  const ids = ['famous', 'local', 'instaplaces', 'restaurants'];
  const images = ids.map(id => (
    <Image key={id} id={`icon-${id}`} image={`/icons/${id}.png`} />
  ));
  return (
    <>
      {images}
      <Layer
        id="icons"
        key="icons"
        type="symbol"
        source="composite"
        sourceLayer="aviasales"
        beforeId="districts-labels"
        filter={[
          'all',
          ['match', ['get', 'type'], ['poi'], true, false],
          ['match', ['get', 'category'], ['districts', 'famous'], false, true]
        ]}
        layout={{
          'icon-image': ['concat', 'icon-', ['get', 'category']],
          'icon-size': 0.5,
          // 'icon-offset': [0, -100],
          'icon-padding': 0,
          'icon-allow-overlap': true
        }}
      />
      <Layer
        id="icons-active"
        key="icons-active"
        type="symbol"
        source="composite"
        sourceLayer="aviasales"
        beforeId="districts-labels"
        filter={['match', ['get', 'category'], ['famous'], true, false]}
        layout={{
          'icon-image': ['concat', 'icon-', ['get', 'category']],
          'icon-size': 0.5,
          // 'icon-offset': [0, -100],
          'icon-padding': 0,
          'icon-allow-overlap': true
        }}
      />
    </>
  );
};
