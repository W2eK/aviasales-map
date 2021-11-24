import { Link } from 'components/shared/link';
import { Poi } from 'interfaces/data.interface';
import { useRouter } from 'next/router';
import { PoiParams } from 'pages/[city]/[category]/[poi]';
import { FC, useMemo } from 'react';
import { DetailsPageContext, useStoreContext } from 'store/context';
import { CardContent } from './content';

type CardProps = {
  poi: Poi;
};

export const Card: FC<CardProps> = ({ poi }) => {
  const query = useRouter().query as Partial<PoiParams>;
  const { state } = useStoreContext() as DetailsPageContext;
  const cardIsOpen = state.currentPoi === poi.id;
  
  return useMemo(() => (
    <Link
    shallow
      pathname="/[city]/[category]"
      query={
        cardIsOpen
          ? { city: query.city, category: query.category }
          : { ...query, poi: cardIsOpen ? undefined : poi.id }
      }
    >
      <CardContent poi={poi} isOpen={cardIsOpen}/>
    </Link>
  ), [cardIsOpen]);
};
