import { usePageContext } from 'context/page-context';
import { AnimatePresence } from 'framer-motion';
import { useMap } from 'mapboxr-gl';
import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import { Title, Subtitle, Header, Wrapper } from './styled';
import { MainPageProps } from 'interfaces/city.interface';

export const Headline: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext() as MainPageProps;
  const { map } = useMap() || {};
  return useMemo(() => {
    const district =
      state.districtHover !== null ? pageProps.poi[state.districtHover] : null;
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
