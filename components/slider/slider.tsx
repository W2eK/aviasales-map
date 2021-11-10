import useEmblaCarousel from 'embla-carousel-react';
import {
  EmblaContainer,
  EmblaMain,
  EmblaSlide,
  Footer,
  ImageWrapper,
  SlideImage,
  SliderLabel
} from './styled';

import { useStoreContext } from 'store/context';
import { usePageContext } from 'context/page-context';

import { FC, useCallback, useEffect, useRef } from 'react';
import { CityPageProps } from 'pages/[city]';
import { setDistrictHover, setPoiHover, setPoiType } from 'store/actions';
import { vibrate } from 'services/vibration';

export const Slider: FC = () => {
  const { state, dispatch } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  const prevIndex = useRef<number>(0);
  const [emblaRef, embla] = useEmblaCarousel({ skipSnaps: true });
  const index =
    pageProps.city?.poi.findIndex(poi => poi.id === state.poiHover) || 0;
  useEffect(() => {
    embla?.scrollTo(index, Math.abs(index - prevIndex.current) > 5);
    prevIndex.current = index;
  }, [state.poiHover]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', () => {
      const index = embla.selectedScrollSnap();
      vibrate(10);
      // dispatch(setDistrictHover(null));
      dispatch(setPoiHover(pageProps.city?.poi[index].id || null));
      dispatch(setPoiType(pageProps.city?.poi[index].type || null));
    });
  }, [embla]);

  if (!pageProps.city) return null;
  const items = pageProps.city.poi.map(poi => (
    <EmblaSlide key={poi.id}>
      {/* <ImageWrapper animate={{ scale: poi.id === state.poiHover ? 1.5 : 1, position: poi.id === state.poiHover ? 'fixed' : 'relative'  }}> */}
      <SlideImage src={poi.image_url} />
      {/* </ImageWrapper> */}
    </EmblaSlide>
  ));
  return (
    <Footer
      animate={{ scale: !state.isDragged ? 1 : 2 }}
      // animate={{
      //   top: state.isDragged ? 0 : 'calc(100% - 150px)',
      //   scale: !state.isDragged ? 1 : 1.5
      // }}
      // style={{ originY: 0 }}
      style={{ originY: 1 }}
      // style={{ originX: 1.5, originY: 1 }}
    >
      {pageProps.city && pageProps.city.poi[index] && (
        <SliderLabel
          animate={{
            scale: !state.isDragged ? 1 : 1 / 2
            // y: state.isDragged ? '-300px' : '-150%'
          }}
          style={{ x: '-50%', y: 'calc(-100% - .5rem)', originY: 1 }}
        >
          {/* <SliderLabel> */}
          {pageProps.city.poi[index].name}
        </SliderLabel>
      )}
      <EmblaMain ref={emblaRef}>
        <EmblaContainer>{items}</EmblaContainer>
      </EmblaMain>
      {/* <EmblaCarousel /> */}
    </Footer>
  );
};
