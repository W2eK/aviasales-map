import { usePageContext } from 'context/page-context';
import { AnimatePresence, Variants } from 'framer-motion';
import { useMap, withMapProvider } from 'mapboxr-gl';
import { District } from 'interfaces/city.interface';
import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import { Title, Subtitle, Header, Wrapper } from './styled';
import mapboxgl from 'mapbox-gl';
import { CityPageProps } from 'pages/[city]';

export const Headline: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  const { map } = useMap() || {};
  return useMemo(() => {
    const district =
      (state.districtHover &&
        pageProps.city.districts.find(
          ({ id }) => id === state.districtHover
        )) ||
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
  }, [state.districtHover, map]);
};
// const Wrapped = withMapProvider(Headline);
// export { Wrapped as Headline };
