// @ts-nocheck
import { FC, useRef } from 'react';
import { Listener, MapHandlers } from 'mapboxr-gl';

type State = {
  dragged: boolean;
  x: number | null;
  y: number | null;
};

export const MapZoom: FC = () => {
  const state = useRef<State>({
    dragged: false,
    x: null,
    y: null
  });
  const handler: MapHandlers['mousemove'] = ({
    target: map,
    originalEvent
  }) => {
    if (!state.current.dragged) return;
    debugger;
    var touch = originalEvent.touches[0];
    var x = touch.pageX;
    var y = touch.pageY;
    // or taking offset into consideration
    // var x_2 = touch.pageX - canvas.offsetLeft;
    // var y_2 = touch.pageY - canvas.offsetTop;
    debugger
    if (state.current.x !== null && state.current.y !== null) {
      const deltaX = state.current.x - x;
      const deltaY = state.current.y - y;
      const center = map.unproject(
        map.project(map.getCenter()).add({ x: deltaX, y: deltaY })
      );
      const max = 1600;
      const min = 0;
      const elevation = map.queryTerrainElevation(center)!;
      const ratio = (1 - (elevation - min) / (max - min)) * 1;
      const zoom = 12 + ratio;
      map.jumpTo({ center, zoom });
    }
    state.current.x = x;
    state.current.y = y;
  };
  const onDragStart: MapHandlers['mousedown'] = () =>
    (state.current.dragged = true);
  const onDragEnd: MapHandlers['mouseup'] = () =>
    (state.current = { dragged: false, x: null, y: null });
  return (
    <>
      <Listener type="on" event="mousedown" handler={onDragStart} />
      <Listener type="on" event="mouseup" handler={onDragEnd} />
      <Listener type="on" event="mousemove" handler={handler} />
      <Listener type="on" event="touchstart" handler={onDragStart} />
      <Listener type="on" event="touchend" handler={onDragEnd} />
      <Listener type="on" event="touchmove" handler={handler} />
    </>
  );
};
