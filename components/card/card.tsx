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
  const cardOpen = state.currentPoi === poi.id;
  const description =
    state.pageProps.page === 'poi' && cardOpen
      ? state.pageProps.description
      : '';
  
  // prettier-ignore
  return useMemo(() => (
    <Link
      pathname={cardOpen ? '/[city]/[category]' : '/[city]/[category]/[poi]'}
      query={
        cardOpen
          ? { city: query.city, category: query.category }
          : { ...query, poi: cardOpen ? undefined : poi.id }
      }
    >
      <CardContent poi={poi} open={cardOpen} description={description}/>
    </Link>
  ), [cardOpen, description]);
};
