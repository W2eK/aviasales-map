import { usePageContext } from 'context/page-context';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { MainPageProps } from 'interfaces/city.interface';
import { Carousel } from './carousel';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-self: flex-end;
`;

export const Slider: FC = () => {
  const pageProps = usePageContext() as MainPageProps;
  const isCityPage = pageProps.page === 'city';
  return useMemo(
    () => (
      <Wrapper>
        <AnimatePresence initial={false}>
          {isCityPage ? null : <Carousel />}
        </AnimatePresence>
      </Wrapper>
    ),
    [isCityPage]
  );
};
