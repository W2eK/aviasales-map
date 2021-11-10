import { FC, useCallback, useMemo } from 'react';
import { Listener, MapHandlers } from 'mapboxr-gl';
import { useStoreContext } from 'store/context';
import { setMapDrag } from 'store/actions';

export const MapDragState: FC = () => {
  const { dispatch } = useStoreContext();
  const onDragStart: MapHandlers['dragstart'] = useCallback(() => {
    dispatch(setMapDrag(true));
  }, [dispatch]);
  const onDragEnd: MapHandlers['dragend'] = useCallback(() => {
    dispatch(setMapDrag(false));
    // console.log(false)
  }, [dispatch]);

  return useMemo(() => {
    return (
      <>
        <Listener type="on" event="dragstart" handler={onDragStart} />
        <Listener type="on" event="dragend" handler={onDragEnd} />
      </>
    );
  }, [onDragStart, onDragEnd]);
};
