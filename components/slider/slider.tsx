import { AnimatePresence, motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { MainPageContext, useStoreContext } from 'store/context';
import { EmblaSlider } from './embla';
import { EmblaSlide, SlideContent, Wrapper } from './styled';
import { SliderWrapper } from './wrapper';

export const Slider: FC = () => {
  const { state, dispatch } = useStoreContext() as MainPageContext;
  const showContent = state.isDetailPage;
  const order = showContent ? state.pageProps.order : [];
  const slides = useMemo(
    () =>
      showContent
        ? order.map(id => (
            <EmblaSlide key={id}>
              <SlideContent>{state.pageProps.poi[id].name}</SlideContent>
            </EmblaSlide>
          ))
        : null,
    [showContent, order]
  );
  return useMemo(
    () => (
      <SliderWrapper showContent={showContent}>
        <EmblaSlider index={state.index} dispatch={dispatch}>
          {slides}
        </EmblaSlider>
      </SliderWrapper>
    ),
    [showContent, slides]
  );
};
