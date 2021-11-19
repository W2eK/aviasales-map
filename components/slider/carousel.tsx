import { FC, useEffect, useMemo, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePageContext } from 'context/page-context';
import { useStoreContext } from 'store/context';
import { CategoryPageProps, PoiPageProps } from 'interfaces/city.interface';
import { vibrate } from 'services/vibration';
import { setPoiHover, setPoiType } from 'store/actions';
import { SliderItems } from '../marker/items';

import { EmblaContainer, EmblaMain } from './styled';
import { AnimatePresence } from 'framer-motion';

export const Carousel: FC = () => {
  const { state, dispatch } = useStoreContext();
  const pageProps = usePageContext() as CategoryPageProps | PoiPageProps;
  const order = useRef(pageProps.order);
  const index = order.current.indexOf(state.poiHover!);
  const [emblaRef, embla] = useEmblaCarousel({
    skipSnaps: true,
    startIndex: index
  });

  useEffect(() => {
    if (pageProps.order) order.current = pageProps.order;
  }, [pageProps.order]);

  // useEffect(() => {
  //   if (!embla) return;
  //   console.log(index);
  // }, [embla]);
  // useEffect(() => {
  //   if (!embla || index === -1) return;
  //   const prevIndex = embla.selectedScrollSnap();
  //   const jump = Math.abs(index - prevIndex) > 20;
  //   embla?.scrollTo(index, jump);
  //   // @ts-ignore
  //   window.embla = embla;
  // }, [state.poiHover]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', () => {
      const index = embla.selectedScrollSnap();
      const id = pageProps.order[index];
      const poi = pageProps.poi[id];
      vibrate(10);
      dispatch(setPoiHover(poi.id || null));
      dispatch(setPoiType(poi.type || null));
    });
  }, [embla, pageProps.order]);

  return useMemo(
    () => (
      <EmblaMain
        ref={emblaRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <EmblaContainer>
          <SliderItems pois={order.current.map(id => pageProps.poi[id])} />
        </EmblaContainer>
      </EmblaMain>
    ),
    [emblaRef, pageProps.poi, pageProps.order]
  );
};
