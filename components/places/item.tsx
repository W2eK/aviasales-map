import { FC } from 'react';
import Link from 'next/link';
import { PlacesItemProps } from './props';
import { ItemImage, Item, ItemText } from './styled';

export const PlacesItem: FC<PlacesItemProps> = ({ place }) => {
  return (
    <Link href={`/${place.iata.toLowerCase()}`} passHref>
      <Item>
        <ItemImage src={`${place.iata}.jpg`} />
        <ItemText>
          {place.country && (
            <span>
              {place.country}
              <br />
            </span>
          )}
          {place.name}
        </ItemText>
      </Item>
    </Link>
  );
};
