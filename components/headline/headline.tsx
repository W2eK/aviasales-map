import { usePageContext } from 'context/page-context';
import { AnimatePresence, Variants } from 'framer-motion';
import { useMap, withMapProvider } from 'mapboxr-gl';
import { District } from 'interfaces/city.interface';
import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import { Title, Subtitle, Header, Wrapper } from './styled';
import mapboxgl from 'mapbox-gl';

export const Headline: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext();
  const { map } = useMap() || {};
  return useMemo(() => {
    if (pageProps.page === 'index' || !pageProps.city) return <Header />;
    const district =
      (state.districtHover &&
        (pageProps.city.poi.find(
          ({ id }) => id === state.districtHover
        ) as District)) ||
      null;

    return (
      <Header animate={district === null ? 'empty' : 'full'}>
        <AnimatePresence initial={false}>
          {district && (
            <Wrapper key={`${district.id}`}>
              <Title>{district.name}</Title>
              <Subtitle>{district.description}</Subtitle>
            </Wrapper>
          )}
        </AnimatePresence>
      </Header>
    );
  }, [state.districtHover, pageProps.page, map]);
};
// const Wrapped = withMapProvider(Headline);
// export { Wrapped as Headline };