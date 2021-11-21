import { AnimatePresence, motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { MainPageContext, useStoreContext } from 'store/context';
import { EmblaSlider } from './embla';
import { EmblaSlide, SlideContent, Wrapper } from './styled';
import { SliderWrapper } from './wrapper';

export const Slider: FC = () => {
  const { state, pageProps, dispatch } = useStoreContext() as MainPageContext;
  const showContent = pageProps.page === 'category' || pageProps.page === 'poi';
  const order = 'order' in pageProps ? pageProps.order : [];
  const slides = useMemo(
    () =>
      showContent
        ? pageProps.order.map(id => (
            <EmblaSlide key={id}>
              <SlideContent>{pageProps.poi[id].name}</SlideContent>
            </EmblaSlide>
          ))
        : null,
    [showContent, order]
  );

  const initialIndex =
    pageProps.page !== 'city' && state.hoverPoi !== null
      ? pageProps.order.indexOf(state.hoverPoi)
      : -1;

  return useMemo(
    () => (
      <SliderWrapper showContent={showContent}>
        <EmblaSlider index={initialIndex} dispatch={dispatch} order={order}>
          {slides}
        </EmblaSlider>
      </SliderWrapper>
    ),
    [showContent, slides]
  );
};
