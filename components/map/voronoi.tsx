import { FC, useMemo } from 'react';
import { Source, Layer, Filter } from 'mapboxr-gl';
import { VoronoiGeojson } from 'interfaces/city.interface';
import { useStoreContext } from 'store/context';
import { Expression } from 'mapbox-gl';

export interface VoronoiProps {
  data: VoronoiGeojson;
}

const VoronoiFilter: FC = () => {
  const { state } = useStoreContext();
  return useMemo(() => {
    const rule: Expression =
      state.selectedType === null
        ? ['case', ['has', 'aggregated'], true, false]
        : ['case', ['==', ['get', 'type'], state.selectedType], true, false];
    return <Filter rule={rule} />;
  }, [state.selectedType]);
};

export const MapVoronoi: FC<VoronoiProps> = ({ data }) => {
  return (
    <Source id="voronoi" type="geojson" data={data}>
      <Layer
        id="voronoi-fill"
        type="fill"
        paint={{
          'fill-opacity': 0
          // 'fill-color': 'rgba(0, 0, 0, 0.01)',
          // 'fill-outline-color': 'white'
        }}
      >
        <VoronoiFilter />
      </Layer>
    </Source>
  );
};
