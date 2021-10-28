/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import importedData from '../../../data/poi.json';
// import data from '../../../data/origins/points.json';
import { FC } from 'react';
import { Layer, Source, Property, Filter } from 'mapboxr-gl';
import { ClusterImages } from './cluster-images';

const data = importedData as GeoJSON.FeatureCollection;

export const MapClusters: FC = ({}) => {
  return (
    <>
      <Source
        key="poi"
        id="poi"
        type="geojson"
        data={data}
        filter={['==', ['get', 'category'], 'famous']}
        cluster
      >
        <ClusterImages />
        <Layer
          key="clusters-circle"
          id="clusters-circle"
          type="circle"
          filter={['has', 'point_count']}
          paint={{
            'circle-color': 'white',
            'circle-radius': 10
          }}
        />
        <Layer
          key="clusters-single"
          id="clusters-single"
          type="circle"
          filter={['!', ['has', 'point_count']]}
          paint={{
            'circle-radius': 5
          }}
        />
        <Layer
          key="cluster-single-images"
          id="cluster-single-images"
          type="symbol"
          filter={['!', ['has', 'cluster']]}
          layout={{
            'icon-image': [
              'concat',
              'single-',
              ['to-string', ['get', 'id']]
            ],
            'icon-size': 0.35,
            'icon-offset': [0, -100],
            'icon-padding': 0,
            'icon-allow-overlap': true
          }}
        />
        <Layer
          key="cluster-images"
          id="cluster-images"
          type="symbol"
          filter={['has', 'cluster']}
          layout={{
            'icon-image': [
              'concat',
              'cluster-',
              ['to-string', ['get', 'cluster_id']]
            ],
            'icon-size': 0.35,
            'icon-offset': [0, -100],
            'icon-padding': 0,
            'icon-allow-overlap': true
          }}
        />
      </Source>
      <Property type="layout" id="visibility" value="none" layer="poi-halo" />
      {/* <Property type="layout" id="visibility" value="none" layer="road" />
      <Property type="layout" id="visibility" value="none" layer="road-bump" />
      <Property type="layout" id="visibility" value="none" layer="road-case" />
      <Property type="layout" id="visibility" value="none" layer="hillshade" />
      <Property type="layout" id="visibility" value="none" layer="landuse" />
      <Property type="layout" id="visibility" value="none" layer="landuse" /> */}
      <Property
        type="layout"
        id="visibility"
        value="none"
        layer="districts-labels"
      />
      {/* <Property
        type="layout"
        id="visibility"
        value="none"
        layer="poi-circles"
      /> */}
      <Filter
        layer="poi-circles"
        rule={['==', ['get', 'category'], 'famous']}
      />
    </>
  );
};
