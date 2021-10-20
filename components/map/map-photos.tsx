/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import data from '../../../data/origins/points.json';
import { FC } from 'react';
import { Marker, Image, Layer } from 'mapboxr-gl';

export const MapPhotos: FC = ({}) => {
  // data.city_map.tabs[1].pins.forEach(({ image_url }) =>
  //   console.log(image_url.replace(/\{\w*\}/g, '2000'))
  // );
  // return null;
  // return (
  //   <Layer
  //     id="aviasales copy 1"
  //     source="composite"
  //     sourceLayer="aviasales"
  //     type="line"
  //     paint={{ 'line-color': 'black' }}
  //   />
  // );
  // const markers = data.city_map.tabs[1].pins.map(
  //   ({ id, coordinates, image_url }) => (
  //     <Marker
  //       key={id}
  //       coordinates={[coordinates.longitude, coordinates.latitude]}
  //     >
  //       <img
  //         src={image_url.replace(/\{\w*\}/g, '100')}
  //         alt="Avatar"
  //         style={{
  //           verticalAlign: 'middle',
  //           width: '30px',
  //           height: '30px',
  //           borderRadius: '50%'
  //         }}
  //       />
  //     </Marker>
  //   )
  // );
  // return <>{markers}</>;
  // @ts-ignore
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
          // 'icon-allow-overlap': true
        }}
      />
    </>
  );
};
