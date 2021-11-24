import { FC, useCallback, useMemo } from 'react';
import { Source, Layer, Filter, Listener, LayerHandlers } from 'mapboxr-gl';
import { MainPageContext, useStoreContext } from 'store/context';
import {
  PoiGeojson,
  PoiProperties,
  VoronoiGeojson
} from 'interfaces/geodata.interface';
import { setPoiHover, setPoiType } from 'store/actions';
import { vibrate } from 'services/vibration';
import { Center } from './center';
import { Expression, MapLayerMouseEvent } from 'mapbox-gl';

export interface PoiProps {
  data: PoiGeojson;
}

const PoiCenter = () => {
  const { state, dispatch } = useStoreContext();
  const handler = useCallback(
    (features: VoronoiGeojson['features']) => {
      const [feature] = features;
      const id = !feature ? null : feature.properties.id;
      const type = !feature ? null : feature.properties.type;
      if (state.hoverPoi !== id) {
        dispatch(setPoiHover(id));
        id && vibrate(10);
      }
      if (state.hoverType !== type) {
        dispatch(setPoiType(type));
      }
    },
    [state.hoverPoi]
  );
  return useMemo(
    () => (
      <Center
        id={state.hoverDistrict}
        layers={['voronoi-fill']}
        handler={handler}
        isDragged={state.isDragged}
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



const PoiSort: FC = () => {
  const { state } = useStoreContext();
  return useMemo(() => {
    const value: Expression =
      state.currentCategory === null
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
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1.5,
          'circle-radius': [
            'case',
            ['boolean', ['feature-state', 'active'], false],
            7,
            3
          ]
        }}
      />
      <Layer
        id="poi-inactive"
        type="symbol"
        beforeId="districts-labels"
        // paint={{
        //   'icon-translate': [0, -12],
        //   'icon-translate-anchor': 'viewport'
        // }}
        layout={{
          'icon-image': ['concat', ['get', 'type'], '-inactive'],
          'icon-size': 0.5,
          'icon-padding': 0,
          // 'icon-allow-overlap': ['step', ['zoom'], false, 11, true]
          'icon-allow-overlap': true
        }}
        cursor
      >
        <PoiSort />
      </Layer>
      <Layer
        id="poi-hover"
        type="symbol"
        beforeId="sky"
        layout={{
          'icon-image': ['concat', ['get', 'type'], '-active'],
          'icon-size': 0.5,
          'icon-padding': 0,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        }}
      >
        <PoiFilter />
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
