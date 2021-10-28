/* eslint-disable jsx-a11y/alt-text */
import importedData from '../../../data/poi.json';
// import data from '../../../data/origins/points.json';
import { FC, useEffect, useState } from 'react';
import MapboxrGL, {
  Listener,
  Image,
  MapHandlers,
  LayerHandlers,
  useMap
} from 'mapboxr-gl';
import mergeImages from 'merge-images';
import { useThrottle } from '../../hooks/use-delay';
import { GeoJSONSource } from 'mapbox-gl';

const data = importedData as GeoJSON.FeatureCollection;

type PoiFeature = GeoJSON.Feature<
  GeoJSON.Point,
  typeof importedData['features'][number]['properties']
>;
type ClusterFeature = GeoJSON.Feature<
  GeoJSON.Point,
  {
    cluster: boolean;
    cluster_id: number;
    point_count: number;
    point_count_abbreviated: number;
  }
>;

const buildScale: (
  domain: [number, number],
  range: [number, number]
) => (x: number) => number = ([min, max], [from, to]) => {
  return (x: number) => ((x - from) / (to - from)) * (max - min) + min;
};

const scale = buildScale([150, 35], [2, 12]);

export const ClusterImages: FC = ({}) => {
  // const {} = useMap()
  const [clusterIds, setClusterIds] = useState<number[]>([]);
  const [imageIds, setImageIds] = useState<number[]>([]);
  // const [data, setData] = useState<{ [key: string]: string }>({});
  const [src, setSrc] = useState<{ [key: string]: string }>({});
  const handler: MapHandlers['sourcedata'] = ({ target: map, sourceId }) => {
    if (sourceId !== 'poi') return;
    // prettier-ignore
    const features = map.querySourceFeatures('poi') as any as
      (PoiFeature | ClusterFeature)[];

    // prettier-ignore
    const newClusters = features
      .filter((feature): feature is ClusterFeature =>'cluster' in feature.properties)
      .map(({properties}) => properties)
      .filter(({cluster_id: id}, i, arr) => arr.findIndex(({cluster_id}) => cluster_id === id) === i)
      .map(({ cluster_id }) => cluster_id)
      .filter(id => !clusterIds.includes(id));

    // prettier-ignore
    const newImages = features
      .filter((feature): feature is PoiFeature =>!('cluster' in feature.properties))
      .map(({properties}) => properties)
      .filter(({ id}, i, arr) => arr.findIndex(({id: other_id}) => other_id === id) === i)
      .map(({ id }) => id)
      .filter(id => !imageIds.includes(id));

    if (newImages.length) {
      setImageIds([...imageIds, ...newImages]);
    }
    if (newClusters.length) {
      setClusterIds([...clusterIds, ...newClusters]);
      newClusters.forEach(id => {
        // prettier-ignore
        (map.getSource('poi') as GeoJSONSource).getClusterLeaves(
          id, Infinity, 0,
          (err, features) => {
            if (err) throw new Error(err);
            const length = features.length
            const offset = scale(length)
            const imageSources = (features as PoiFeature[])
              .map(({ properties }) => properties.id)
              .map((id, i) => ({ src: `/png/${id}.png`, x: i * offset, y: 0 }));
            const imageOptions = {
              height: 206,
              width: 206 + offset * imageSources.length
            }
            mergeImages(imageSources, imageOptions).then(result => {
              setSrc(src => ({ ...src, [id]: result }));
              map.fire('move')
            });
          }
        );
      });
    }
  };
  const clusterImages = Object.entries(src).map(([key, value]) => (
    <Image key={key} id={`cluster-${key}`} image={value} />
  ));
  const singleImages = imageIds.map(id => (
    <Image key={id} id={`single-${id}`} image={`/png/${id}.png`} />
  ));
  return (
    <>
      <Listener type="on" handler={handler} event="sourcedata" />
      {clusterImages}
      {singleImages}
    </>
  );
};
