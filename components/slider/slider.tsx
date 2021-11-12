import {
  Footer,
  StyledLabelWrapper
} from './styled';

import { useStoreContext } from 'store/context';
import { usePageContext } from 'context/page-context';

import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { CityPageProps } from 'pages/[city]';
import { setDistrictHover, setPoiHover, setPoiType } from 'store/actions';
import { vibrate } from 'services/vibration';
import { SliderItems } from 'components/marker/items';
import { Carousel } from './carousel';
import { ImageLabel, LabelWrapper } from 'components/marker/styled';

export const Slider: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  const poiName =
    pageProps.city?.poi.find(({ id }) => id === state.poiHover)?.name || '';
  const footer = useMemo(
    () => (
      <Footer
        animate={{ scale: !state.isDragged ? 2.5 : 1 }}
        // animate={{ scale: 1 }}
        style={{ originY: 1, originX: 0.5 }}
      >
        <Carousel />
      </Footer>
    ),
    [state.isDragged]
  );
  return (
    <>
      {footer}
      <StyledLabelWrapper
        animate={{
          // scale: !state.isDragged ? 0.4 : 1,
          x: '-50%',
          y: !state.isDragged ? -16 : 100
        }}
      >
        <ImageLabel>{poiName}</ImageLabel>
      </StyledLabelWrapper>
    </>
  );
};
