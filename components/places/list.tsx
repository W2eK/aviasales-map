import { FC } from 'react';
import { useStoreContext } from 'store/context';
import { PlacesItem } from './item';
import { PlacesListProps } from './props';
import { List } from './styled';

export const PlacesList: FC<PlacesListProps> = ({ places }) => {
  const items = places.map(place => (
    <PlacesItem key={place.iata} place={place} />
  ));
  return (
    <List>
      {items}
    </List>
  );
};
