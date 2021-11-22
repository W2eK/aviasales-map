import { FC, ReactNode } from 'react';
import { Listener, MapHandlers, LayerHandlers } from 'mapboxr-gl';

type ClickProps = {
  handler: MapHandlers['click'] | LayerHandlers['click'];
};

export const ClickHandler: FC<ClickProps> = ({ handler }) => {
  const clickHandler: MapHandlers['click'] = event => {
    if (!event.defaultPrevented) handler(event);
    event.preventDefault();
  };
  return <Listener type="on" event="click" handler={clickHandler} />;
};
