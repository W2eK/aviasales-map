import { Footer, StyledLabelWrapper } from './styled';

import { useStoreContext } from 'store/context';
import { usePageContext } from 'context/page-context';

import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { CityPageProps } from 'interfaces/city.interface';
import { setDistrictHover, setPoiHover, setPoiType } from 'store/actions';
import { vibrate } from 'services/vibration';
import { SliderItems } from 'components/marker/items';
import { Carousel } from './carousel';
import { ImageLabel, LabelWrapper } from 'components/marker/styled';

export const Slider: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  const name =
    state.poiHover !== null ? pageProps.poi[state.poiHover].name : null;

  const footer = useMemo(
    () => (
      <Footer
        animate={{
          scale: !state.isDragged ? 2.5 : 1,
          y: state.poiHover === null ? '250%' : 0
        }}
        // animate={{ scale: 1 }}
        style={{ originY: 1, originX: 0.5 }}
      >
        <Carousel />
      </Footer>
    ),
    [state.isDragged, state.poiHover === null]
  );
  const label = useMemo(
    () => (
      <StyledLabelWrapper
        animate={{
          // scale: !state.isDragged ? 0.4 : 1,
          x: '-50%',
          y: !state.isDragged ? -16 : 100
        }}
      >
        {name && <ImageLabel>{name}</ImageLabel>}
      </StyledLabelWrapper>
    ),
    [state.isDragged, name]
  );
  return (
    <>
      {footer}
      {label}
    </>
  );
};
