import {
  Dispatch,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  EmblaContainer,
  EmblaViewport,
  EmblaPlaceholder,
  EmblaSlide,
  EmblaButton,
  EmblaMain
} from './styled';
import { Action, setIndex, setPoiHover } from 'store/actions';
import { vibrate } from 'services/vibration';
import { useStoreContext } from 'store/context';

type EmblaProps = {
  children?: ReactNode;
  startIndex: number;
  dispatch: Dispatch<Action>;
};

export const EmblaSlider: FC<EmblaProps> = ({
  children,
  startIndex,
  dispatch
}) => {
  const indexOffset = 1;
  const { state } = useStoreContext();
  const { index } = state;
  const [ref, embla] = useEmblaCarousel({
    // loop: true,
    startIndex: startIndex + indexOffset,
    skipSnaps: true
  });

  const onSelect = useCallback(() => {
    if (!embla) return;
    const index = embla.selectedScrollSnap() - indexOffset;
    dispatch(setIndex(index));
    vibrate(10);
  }, [embla, dispatch]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return () => {};
    embla.reInit();
    embla.on('select', onSelect);
    return () => embla.off('select', onSelect);
  }, [children, onSelect]);

  useLayoutEffect(() => {
    if (embla) embla.scrollTo(startIndex + indexOffset, true);
  }, [embla, children, startIndex]);

  useLayoutEffect(() => {
    if (!embla) return;
    const currentIndex = embla.selectedScrollSnap() + indexOffset;
    const jump = Math.abs(currentIndex - index) >= 5 ? true : false;
    embla.scrollTo(index + indexOffset, jump);
  }, [embla, children, index]);

  // prettier-ignore
  return useMemo(() => (
    <EmblaMain>
      <EmblaViewport ref={ref}>
        <EmblaContainer>
          <EmblaPlaceholder />
          {children}
          <EmblaPlaceholder />
        </EmblaContainer>
      </EmblaViewport>
      <EmblaButton onClick={scrollPrev} />
      <EmblaButton onClick={scrollNext} />
    </EmblaMain>
  ), [children, embla])
};
