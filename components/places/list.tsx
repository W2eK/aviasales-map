import { FC } from 'react';
import { useStoreState } from 'store/context';
import { PlacesItem } from './item';
import { PlacesListProps } from './props';
import { List } from './styled';

export const PlacesList: FC<PlacesListProps> = ({ places }) => {
  const { state } = useStoreState();
  const items = places.map(place => (
    <PlacesItem key={place.iata} place={place} />
  ));
  return (
    <List>
      <pre>{JSON.stringify(state)}</pre>
      {items}
    </List>
  );
};
