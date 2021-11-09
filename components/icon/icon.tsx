import { FC } from 'react';
import Placeholder from './svg/placeholder.svg';
import Beaches from './svg/beaches.svg';
import Districts from './svg/districts.svg';
import Famous from './svg/famous.svg';
import Instaplaces from './svg/instaplaces.svg';
import Local from './svg/local.svg';
import Nature from './svg/nature.svg';
import Parks from './svg/parks.svg';
import Restaurants from './svg/restaurants.svg';
import Suburb from './svg/suburb.svg';
import { PoiType } from 'interfaces/city.interface';

type Icons = Record<PoiType, any> & { placeholder: any };

const icons: Icons = {
  placeholder: <Placeholder />,
  beaches: <Beaches />,
  districts: <Districts />,
  famous: <Famous />,
  instaplaces: <Instaplaces />,
  local: <Local />,
  nature: <Nature />,
  parks: <Parks />,
  restaurants: <Restaurants />,
  suburb: <Suburb />,
};

type IconProps = {
  category: PoiType;
};

export const Icon: FC<IconProps> = ({ category }) => {
  return icons[category] || icons.placeholder;
};
