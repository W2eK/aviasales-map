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
  const { currentCategory, mapLocked } = state;
  return useMemo(() => {
    const isVisible =
      !mapLocked &&
      (currentCategory === null || currentCategory === 'districts');
    const value: Visibility = isVisible ? 'visible' : 'none';
    return <Property type="layout" name="visibility" value={value} />;
  }, [currentCategory, mapLocked]);
};

const LabelsFilter: FC = () => {
  const { state } = useStoreContext();
  const { hoverDistrict, currentCategory } = state;
  return useMemo(() => {
    const equality = currentCategory !== 'districts' ? '!=' : '==';
    const rule: Expression = [
      'case',
      [equality, ['get', 'id'], hoverDistrict],
      true,
      false
    ];
    return <Filter rule={rule} />;
  }, [hoverDistrict, currentCategory]);
};

export const MapLabels: FC<MapLabelsProps> = ({ data }) => {
  const colorRule: Expression = [
    'case',
    ['boolean', ['feature-state', 'active'], false],
    'black',
    'black'
  ];
  return (
    <Source id="labels" type="geojson" data={data} promoteId="id">
      <Layer
        master="districts-labels-24"
        filter={null}
        replaceMaster
        sourceLayer=""
        type="symbol"
        paint={{ 'text-color': colorRule }}
      >
        <LabelsFilter />
        <LabelsVisibility />
      </Layer>
      <Layer
        master="districts-labels-48"
        filter={null}
        replaceMaster
        sourceLayer=""
        type="symbol"
        paint={{ 'text-color': colorRule }}
        // paint={{ 'text-color': '#5A6472' }}
      >
        <LabelsFilter />
        <LabelsVisibility />
      </Layer>
    </Source>
  );
};
