import { FC, useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePageContext } from 'context/page-context';
import { useStoreContext } from 'store/context';
import { CityPageProps } from 'interfaces/city.interface';
import { vibrate } from 'services/vibration';
import { setPoiHover, setPoiType } from 'store/actions';
import { SliderItems } from '../marker/items';

import { EmblaContainer, EmblaMain, StyledLabelWrapper } from './styled';
import { ImageLabel } from 'components/marker/styled';

export const Carousel: FC = () => {
  const { state, dispatch } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  const [emblaRef, embla] = useEmblaCarousel({ skipSnaps: true });

  const index = pageProps.order.indexOf(state.poiHover!);

  useEffect(() => {
    if (!embla || index === -1) return;
    const prevIndex = embla.selectedScrollSnap();
    const jump = Math.abs(index - prevIndex) > 20;
    embla?.scrollTo(index, jump);
    // @ts-ignore
    window.embla = embla;
  }, [state.poiHover]);

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
  }, [embla]);
  return useMemo(
    () => (
      <EmblaMain ref={emblaRef}>
        <EmblaContainer>
          <SliderItems pois={pageProps.order.map(id => pageProps.poi[id])} />
        </EmblaContainer>
      </EmblaMain>
    ),
    [emblaRef, pageProps.poi]
  );
};
