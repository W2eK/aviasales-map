import { Dispatch, FC, ReactNode, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaContainer, EmblaMain, EmblaSlide } from './styled';
import { Action, setIndex, setPoiHover } from 'store/actions';
import { vibrate } from 'services/vibration';

type EmblaProps = {
  children?: ReactNode;
  index: number;
  dispatch: Dispatch<Action>;
};

export const EmblaSlider: FC<EmblaProps> = ({ children, index, dispatch }) => {
  const indexOffset = 1;
  const [ref, embla] = useEmblaCarousel({
    startIndex: index + indexOffset,
    skipSnaps: true
  });

  const onSelect = useCallback(() => {
    if (!embla) return;
    const index = embla.selectedScrollSnap() - indexOffset;
    dispatch(setIndex(index));
    vibrate(10);
  }, [embla, dispatch]);

  useEffect(() => {
    if (!embla) return () => {};
    embla.reInit();
    embla.on('select', onSelect);
    return () => embla.off('select', onSelect);
  }, [children, onSelect]);

  useEffect(() => {
    if (!embla) return;
    const currentIndex = embla.selectedScrollSnap() + indexOffset;
    if (currentIndex !== index) embla.scrollTo(index + indexOffset, true);
  }, [children, index]);

  return (
    <EmblaMain ref={ref}>
      <EmblaContainer>
        <EmblaSlide />
        {children}
      </EmblaContainer>
    </EmblaMain>
  );
};
