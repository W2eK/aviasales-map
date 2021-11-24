import { FC, useMemo } from 'react';
import { Source, Layer, Filter, Property } from 'mapboxr-gl';
import { LabelsGeojson } from 'interfaces/geodata.interface';
import { Expression, Visibility } from 'mapbox-gl';
import { useStoreContext } from 'store/context';

type MapLabelsProps = {
  data: LabelsGeojson;
};

const LabelsVisibility: FC = () => {
  const { state } = useStoreContext();
  return useMemo(() => {
    const value: Visibility = state.isDetailPage ? 'none' : 'visible';
    return <Property type="layout" name="visibility" value={value} />;
  }, [state.isDetailPage, state.hoverPoi, state.isDragged]);
};

const LabelsFilter: FC = () => {
  const { state } = useStoreContext();
  const { currentCategory } = state;
  return useMemo(() => {
    const equality = currentCategory !== 'districts' ? '!=' : '==';
    const rule: Expression =
      currentCategory !== null && currentCategory !== 'districts'
        ? ['any', false]
        : ['case', [equality, ['get', 'id'], state.hoverDistrict], true, false];
    return <Filter rule={rule} />;
  }, [state.hoverDistrict, currentCategory]);
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
        {/* <LabelsVisibility /> */}
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
        {/* <LabelsVisibility /> */}
      </Layer>
    </Source>
  );
};
