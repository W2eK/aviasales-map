import { Card } from 'components/card';
import { FC, useMemo, useRef } from 'react';
import { MainPageContext, useStoreContext } from 'store/context';
import { EmblaSlider } from './embla';
import { EmblaSlide } from './styled';
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
              <Card poi={state.pageProps.poi[id]} />
            </EmblaSlide>
          ))
        : null,
    [showContent, order]
  );
  return useMemo(
    () => (
      <SliderWrapper showContent={showContent}>
        <EmblaSlider startIndex={state.index} dispatch={dispatch}>
          {slides}
        </EmblaSlider>
      </SliderWrapper>
    ),
    [showContent, slides]
  );
};
