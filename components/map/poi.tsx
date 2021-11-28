import { FC, useCallback, useMemo } from 'react';
import { Source, Layer, Filter, Property } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { PoiGeojson, VoronoiGeojson } from 'interfaces/geodata.interface';
import { setPoiHover, setPoiType } from 'store/actions';
import { vibrate } from 'services/vibration';
import { Center } from './center';
import {
  Expression,
  LngLat,
  Map,
  MapLayerMouseEvent,
  Visibility
} from 'mapbox-gl';

export interface PoiProps {
  data: PoiGeojson;
}

const PoiCenter = () => {
  const { state, dispatch } = useStoreContext();
  const handler = useCallback(
    (features: VoronoiGeojson['features'], map: Map) => {
      const [feature] = features;
      if (feature) {
        const center = map.getCenter();
        const { id, type, lon, lat } = feature.properties;
        const close =
          !!state.currentCategory ||
          map.project(center).dist(map.project(new LngLat(lon, lat))) < 55;
        if (close && state.hoverPoi !== id) {
          dispatch(setPoiHover(id));
          dispatch(setPoiType(type));
          id && vibrate(10);
        } else if (state.hoverPoi !== null && !close) {
          dispatch(setPoiHover(null));
          dispatch(setPoiType(null));
        }
      } else if (state.hoverPoi) {
        dispatch(setPoiHover(null));
        dispatch(setPoiType(null));
      }
    },
    [state.hoverPoi, state.currentCategory]
  );
  return useMemo(
    () => (
      <Center
        id={state.hoverPoi}
        layers={['voronoi-fill']}
        handler={handler}
        isDragged={state.isDragged}
        featureStateSource="poi"
      />
    ),
    [state.isDragged, handler]
  );
};

const PoiFilter: FC = () => {
  const { state } = useStoreContext();
  // ! BUG: Filter don't work on zoom 10-11
  return useMemo(() => {
    const rule: Expression =
      state.hoverPoi === null
        ? ['any', false]
        : ['case', ['==', ['get', 'id'], state.hoverPoi], true, false];
    return <Filter rule={rule} />;
  }, [state.hoverPoi]);
};

const PoiVisibility: FC = () => {
  const {
    state: { mapLocked }
  } = useStoreContext();
  return useMemo(() => {
    return (
      <Property type="paint" name="icon-opacity" value={mapLocked ? 0 : 1} />
    );
  }, [mapLocked]);
};

const PoiSort: FC = () => {
  const { state } = useStoreContext();
  return useMemo(() => {
    const value: Expression =
      state.currentCategory === null || state.currentCategory === 'all'
        ? ['any', true]
        : ['case', ['==', ['get', 'type'], state.currentCategory], true, false];
    // return <Property name="symbol-sort-key" type="layout" value={value} />;
    return <Filter rule={value} />;
  }, [state.currentCategory]);
};

export const MapPoi: FC<PoiProps> = ({ data }) => {
  return (
    <Source id="poi" data={data} type="geojson" promoteId="id" strict>
      <PoiCenter />
      <Layer
        master="poi-circles"
        replaceMaster
        sourceLayer=""
        type="circle"
        layout={{ visibility: 'visible' }}
        filter={null}
        paint={{
          'circle-color': [
            'case',
            ['boolean', ['feature-state', 'active'], false],
            '#0655fe',
            '#9ea9b7'
          ],
          'circle-stroke-color': 'rgb(239, 241, 244)',
          'circle-stroke-width': 1.5,
          'circle-radius': [
            'case',
            ['boolean', ['feature-state', 'active'], false],
            4,
            2.5
          ]
        }}
      />
      <Layer
        id="poi-inactive"
        type="symbol"
        beforeId="districts-labels"
        layout={{
          'icon-offset': [0, -21],
          'icon-image': ['concat', ['get', 'type'], '-inactive'],
          'icon-size': 0.5,
          'icon-padding': 0,
          // 'icon-allow-overlap': ['step', ['zoom'], false, 11, true]
          'icon-allow-overlap': true
        }}
        cursor
      >
        <PoiSort />
        <PoiVisibility />
      </Layer>
      <Layer
        id="poi-hover"
        type="symbol"
        beforeId="sky"
        layout={{
          'icon-offset': [0, -21],
          'icon-image': ['concat', ['get', 'type'], '-active'],
          'icon-size': 0.5,
          'icon-padding': 0,
          'icon-allow-overlap': true,
          'icon-ignore-placement': false
        }}
      >
        <PoiFilter />
        <PoiVisibility />
      </Layer>
      {/* <Layer
        id="poi-hover-overpass"
        type="symbol"
        beforeId="sky"
        paint={{
          'icon-opacity': 0.3
        }}
        layout={{
          'icon-image': ['concat', ['get', 'type'], '-active'],
          'icon-size': 0.5,
          'icon-padding': 0,
          'icon-allow-overlap': true
          // 'icon-ignore-placement': true
        }}
      >
        <PoiFilter />
      </Layer> */}
    </Source>
  );
};
