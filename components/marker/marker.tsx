import { SlideImage } from 'components/slider/styled';
import { Poi } from 'interfaces/city.interface';
import { FC } from 'react';
import { ImageLabel, ImageWrapper, LabelWrapper } from './styled';

type MarkerProps = { poi: Poi };

export const Marker: FC<MarkerProps> = ({ poi }) => {
  return (
    <ImageWrapper>
      <SlideImage src={poi.image_url} key={poi.id} />
      <LabelWrapper>
        <ImageLabel>{poi.name}</ImageLabel>
      </LabelWrapper>
    </ImageWrapper>
  );
};
