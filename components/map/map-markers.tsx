/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import data from '../../../data/origins/points.json';
import { FC } from 'react';
import { Marker, Image, Layer, Property } from 'mapboxr-gl';

export const MapMarkers: FC = ({}) => {
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
  const ids = ['famous', 'local', 'instaplaces', 'restaurants'];
  const images = ids.map(id => (
    <Image
      key={id}
      id={`${id}-png`}
      image={`/icons/${id}.png`}
      // options={{ sdf: true, pixelRatio: 4 }}
    />
  ));
  return (
    <>
      {images}
      <Layer
        id="poi-icons"
        source="composite"
        sourceLayer="aviasales"
        type="symbol"
        filter={[
          'all',
          ['match', ['get', 'type'], ['poi'], true, false],
          ['match', ['get', 'category'], ['districts'], false, true]
        ]}
        layout={{
          'icon-image': ['concat', ['get', 'category'], '-png'],
          'icon-size': 0.25,
          'icon-offset': [0, -44],
          'icon-allow-overlap': true,
          'symbol-sort-key': ['match', ['get', 'category'], ['famous'], 1, 0]
        }}
      />
      <Property type="layout" id="visibility" value="none" layer="poi-halo" />
      <Property
        type="layout"
        id="visibility"
        value="none"
        layer="poi-circles"
      />
    </>
  );
};
