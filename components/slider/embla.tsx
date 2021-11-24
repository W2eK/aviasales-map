import {
  Dispatch,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef
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
import { Action, setIndex, setPoiHover, setSliderHeight } from 'store/actions';
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
  const ref = useRef<HTMLDivElement>(null);
  const [emblaRef, embla] = useEmblaCarousel({
    // loop: true,
    startIndex: startIndex + indexOffset,
    skipSnaps: true
  });

  const showButtons = state.currentPoi === null;

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

  useEffect(() => {
    const height = ref.current?.clientHeight;
    if (height) dispatch(setSliderHeight(height));
  }, [ref.current?.clientHeight]);
  // prettier-ignore
  return useMemo(() => (
    <EmblaMain ref={ref}>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          <EmblaPlaceholder />
          {children}
          <EmblaPlaceholder />
        </EmblaContainer>
      </EmblaViewport>
      {true ? (
        <>
          <EmblaButton onClick={scrollPrev} />
          <EmblaButton onClick={scrollNext} />
        </>
      ) : null}
    </EmblaMain>
  ), [children, embla])
};
