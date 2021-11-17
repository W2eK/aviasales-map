import { SlideImage } from 'components/slider/styled';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { Poi } from 'interfaces/data.interface';
import { FC, useEffect } from 'react';
import { ImageLabel, ImageWrapper, LabelWrapper } from './styled';
import { Link } from 'components/shared/link';

type MarkerProps = { poi: Poi; isDragged: boolean };

export const Marker: FC<MarkerProps> = ({ poi, isDragged }) => {
  const router = useRouter();
  isDragged = true;
  console.log(router.query);
  return (
    <AnimatePresence>
      {isDragged ? (
        <Link
          pathname="/[city]/[category]/[poi]/"
          query={{ ...router.query, category: 'all', poi: poi.id + '' }}
        >
          <ImageWrapper
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
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
