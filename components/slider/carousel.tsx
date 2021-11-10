import { FC, useEffect, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePageContext } from 'context/page-context';
import { useStoreContext } from 'store/context';
import { CityPageProps } from 'pages/[city]';
import { vibrate } from 'services/vibration';
import { setPoiHover, setPoiType } from 'store/actions';
import { SliderItems } from '../marker/items';

import { EmblaContainer, EmblaMain, StyledLabelWrapper } from './styled';
import { ImageLabel } from 'components/marker/styled';

export const Carousel: FC = () => {
  const { state, dispatch } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  const [emblaRef, embla] = useEmblaCarousel({ skipSnaps: true });

  const index =
    pageProps.city?.poi.findIndex(poi => poi.id === state.poiHover) || 0;

  useEffect(() => {
    if (!embla) return;
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
      vibrate(10);
      dispatch(setPoiHover(pageProps.city?.poi[index].id || null));
      dispatch(setPoiType(pageProps.city?.poi[index].type || null));
    });
  }, [embla]);
  return useMemo(
    () =>
      pageProps.city === undefined ? null : (
        <EmblaMain ref={emblaRef}>
          <EmblaContainer>
            <SliderItems pois={pageProps.city.poi} />
          </EmblaContainer>
        </EmblaMain>
      ),
    [emblaRef, pageProps.city]
  );
};
