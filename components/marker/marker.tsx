import { SlideImage } from 'components/slider/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { Poi } from 'interfaces/city.interface';
import { FC, useEffect } from 'react';
import { ImageLabel, ImageWrapper, LabelWrapper } from './styled';

type MarkerProps = { poi: Poi; isDragged: boolean };

export const Marker: FC<MarkerProps> = ({ poi, isDragged }) => {
  const router = useRouter();
  // isDragged = true;
  return (
    <AnimatePresence>
      {isDragged ? (
        <Link
          // href={{ pathname: `/${router.pathname}`, query: { poi: poi.id } }}
          href={{
            pathname: '/[city]',
            query: { ...router.query, poi: poi.id }
          }}
          passHref
        >
          <ImageWrapper
            initial={{ opacity: 0, y: 600 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 600 }}
          >
            <SlideImage src={poi.image_url} key={poi.id} />
            <LabelWrapper>
              <ImageLabel>{poi.name}</ImageLabel>
            </LabelWrapper>
          </ImageWrapper>
        </Link>
      ) : null}
    </AnimatePresence>
  );
};
