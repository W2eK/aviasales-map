import { FC, useMemo } from 'react';
import { Source, Layer, Filter } from 'mapboxr-gl';
import { LabelsGeojson } from 'interfaces/city.interface';
import { Expression } from 'mapbox-gl';
import { useStoreContext } from 'store/context';

type MapLabelsProps = {
  data: LabelsGeojson;
};

const LabelsFilter: FC = () => {
  const { state } = useStoreContext();
  return useMemo(() => {
    const rule: Expression = [
      'case',
      ['!=', ['get', 'id'], state.districtHover],
      true,
      false
    ];
    return <Filter rule={rule} />;
  }, [state.districtHover]);
};

export const MapLabels: FC<MapLabelsProps> = ({ data }) => {
  return (
    <Source id="labels" type="geojson" data={data} promoteId="id">
      <Layer
        master="districts-labels-24"
        filter={null}
        replaceMaster
        sourceLayer=""
        type="symbol"
      >
        <LabelsFilter />
      </Layer>
      <Layer
        master="districts-labels-48"
        filter={null}
        replaceMaster
        sourceLayer=""
        type="symbol"
        // paint={{ 'text-color': '#5A6472' }}
      >
        <LabelsFilter />
      </Layer>
    </Source>
  );
};
