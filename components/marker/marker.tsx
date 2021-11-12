import { SlideImage } from 'components/slider/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { Poi } from 'interfaces/city.interface';
import { FC } from 'react';
import { ImageLabel, ImageWrapper, LabelWrapper } from './styled';

type MarkerProps = { poi: Poi; dragged: boolean };

export const Marker: FC<MarkerProps> = ({ poi, dragged }) => {
  const router = useRouter();
  return (
    <Link
      // href={{ pathname: `/${router.pathname}`, query: { poi: poi.id } }}
      href={{ pathname: '/[city]' ,query: { ...router.query, poi: poi.id } }}
      passHref
    >
      <ImageWrapper>
        <SlideImage src={poi.image_url} key={poi.id} />
        <LabelWrapper>
          <ImageLabel>{poi.name}</ImageLabel>
        </LabelWrapper>
      </ImageWrapper>
    </Link>
  );
};
