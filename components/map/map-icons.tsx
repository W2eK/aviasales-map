/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import { FC, Fragment, useState } from 'react';
import {
  Source,
  Marker,
  Image,
  Layer,
  Listener,
  MapHandlers,
  FeatureState,
  Property
} from 'mapboxr-gl';
import { poi } from '../../data/poi';
import { MapMarker } from './map-marker';

type Features = typeof poi['features'];
export type Feature = Features[number];

const mappedPoi = poi.features.reduce((obj, feature) => {
  obj[feature.properties.id] = feature;
  return obj;
}, {} as { [key: number]: Feature });

export const MapIcons: FC = ({}) => {
  const ids = ['famous', 'local', 'instaplaces', 'restaurants'];
  const images = ids.map(id => (
    <Fragment key={id}>
      <Image id={`${id}-inactive`} image={`/icons/${id}-inactive.png`} />
      <Image id={`${id}-active`} image={`/icons/${id}.png`} />
      <Image id={`${id}-hover`} image={`/icons/${id}-hover.png`} />
    </Fragment>
  ));
  const [hover, setHover] = useState<number | null>(null);
  const handler: MapHandlers['move'] = ({ target: map }) => {
    const center = map.getCenter();
    const [feature] = map.queryRenderedFeatures(map.project(center), {
      layers: ['voronoi-fill']
    }) as any as Features;
    if (!feature) return setHover(null);
    const id = feature.properties.id;
    if (id !== hover) {
      // TODO: Touch feedback
      navigator.vibrate(5)
      setHover(id);
    }
  };
  const feature = hover && mappedPoi[hover];
  return (
    <Source data={poi} type="geojson" promoteId="id">
      {images}
      <Layer
        id="icons"
        key="icons"
        type="symbol"
        beforeId="districts-labels"
        filter={[
          'all',
          ['match', ['get', 'type'], ['poi'], true, false],
          ['match', ['get', 'category'], ['districts', 'famous'], false, true]
        ]}
        layout={{
          'icon-image': ['concat',['get', 'category'], '-inactive'],
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
        beforeId="districts-labels"
        filter={['match', ['get', 'category'], ['famous'], true, false]}
        layout={{
          'icon-image': ['case', ['==', ['get', 'id'], 93], ['concat', ['get', 'category'], '-hover'], ['concat', ['get', 'category'], '-active']],
          'icon-size': 0.5,
          // 'icon-offset': [0, -100],
          'icon-padding': 0,
          'icon-allow-overlap': true
        }}
      />
      <Listener type="on" event="move" handler={handler} />
      {/* {feature && <MapMarker feature={feature} />} */}
    </Source>
  );
};
