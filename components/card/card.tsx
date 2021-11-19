import { Poi } from 'interfaces/data.interface';
import { FC } from 'react';
import { CardImage, CardWrapper, ImageWrapper } from './styled';

type CardProps = {
  poi: Poi;
};

export const Card: FC<CardProps> = ({ poi }) => {
  return (
    <CardWrapper>
      <ImageWrapper>
        <CardImage src={poi.image_url} />
      </ImageWrapper>
      <div style={{ overflow: 'hidden', position: 'absolute', top: 0 }}>
        {poi.name}
      </div>
    </CardWrapper>
  );
};
