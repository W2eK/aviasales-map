import { Dispatch, FC, ReactNode, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaContainer, EmblaMain, EmblaSlide } from './styled';
import { Action, setPoiHover } from 'store/actions';
import { vibrate } from 'services/vibration';

type EmblaProps = {
  children?: ReactNode;
  index: number;
  dispatch: Dispatch<Action>;
  order: number[];
};

export const EmblaSlider: FC<EmblaProps> = ({
  children,
  index,
  dispatch,
  order
}) => {
  const [ref, embla] = useEmblaCarousel({
    startIndex: index + 1,
    skipSnaps: true
  });
  const onSelect = useCallback(() => {
    if (!embla) return;
    const index = embla.selectedScrollSnap() - 1;
    if (index === -1) return dispatch(setPoiHover(null));
    const id = order[index];
    vibrate(10);
    dispatch(setPoiHover(id));
  }, [embla, dispatch, order]);

  useEffect(() => {
    if (!embla) return () => {};
    embla.reInit();
    embla.on('select', onSelect);
    return () => embla.off('select', onSelect);
  }, [children, onSelect]);

  return (
    <EmblaMain ref={ref}>
      <EmblaContainer>
        <EmblaSlide />
        {children}
      </EmblaContainer>
    </EmblaMain>
  );
};
