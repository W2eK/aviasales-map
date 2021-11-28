import { Place } from 'interfaces/places.interface';
import { FC } from 'react';
import { useStoreContext } from 'store/context';
import { PlacesItem } from './item';
import { List } from './styled';

export interface PlacesListProps {
  places: Place[];
}

export const PlacesList: FC<PlacesListProps> = ({ places }) => {
  const items = places.map(place => (
    <PlacesItem key={place.iata} place={place} />
  ));
  return <List>{items}</List>;
};
