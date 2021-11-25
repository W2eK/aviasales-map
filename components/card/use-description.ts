import { useViewport } from 'hooks/use-viewport';
import { PoiType } from 'interfaces/data.interface';
import { useEffect, useState } from 'react';
import { aviasalesApi } from 'services/aviasales-api';

type UseDescriptionProps = {
  id: number;
  type: PoiType;
};

export const useDescription = ({ id, type: poiType }: UseDescriptionProps) => {
  const [ref, isVisible] = useViewport();
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (ref.current && isVisible && !description) {
      const type = poiType === 'districts' ? 'districts' : 'poi';
      aviasalesApi
        .requestPoi({ id, type })
        .then(({ description }) => setDescription(description));
    }
  }, [ref.current, isVisible]);
  return [ref, description];
};
