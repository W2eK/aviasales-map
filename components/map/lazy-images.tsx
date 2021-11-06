/* eslint-disable jsx-a11y/alt-text */
import { Image, Listener, MapHandlers } from 'mapboxr-gl';
import { FC, useState } from 'react';

const initialIds = ['famous', 'local', 'instaplaces']
  .map(id => ['-active', '-inactive', '-hover'].map(type => `${id}${type}`))
  .flat();

export const LazyImages: FC = () => {
  const [ids, setIds] = useState<string[]>(initialIds);
  const handler: MapHandlers['styleimagemissing'] = ({ id }) =>
    setIds(ids => [...new Set(ids).add(id)]);

  const images = ids.map(id => (
    <Image id={id} key={id} image={`/icons/${id}.png`} />
  ));
  return (
    <>
      {images}
      <Listener type="on" event="styleimagemissing" handler={handler} />
    </>
  );
};
