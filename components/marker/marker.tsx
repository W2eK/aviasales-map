import { SlideImage } from 'components/slider/styled';
import { AnimatePresence } from 'framer-motion';
import { Poi } from 'interfaces/city.interface';
import { FC } from 'react';
import { ImageLabel, ImageWrapper, LabelWrapper } from './styled';

type MarkerProps = { poi: Poi; dragged: boolean };

export const Marker: FC<MarkerProps> = ({ poi, dragged }) => {
  return !dragged ? null : (
    <ImageWrapper>
      <SlideImage src={poi.image_url} key={poi.id} />
      <LabelWrapper>
        <ImageLabel>{poi.name}</ImageLabel>
      </LabelWrapper>
    </ImageWrapper>
  );
};
