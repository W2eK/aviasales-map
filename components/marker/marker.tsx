import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { Poi } from 'interfaces/data.interface';
import { FC } from 'react';
import { ImageLabel, ImageWrapper, LabelWrapper } from './styled';
import { Link } from 'components/shared/link';
import { MarkerImage } from './image';

type MarkerProps = { poi: Poi | null };

export const Marker: FC<MarkerProps> = ({ poi }) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      {poi && router.route === '/[city]' ? (
        <Link
          pathname="/[city]/[category]/"
          query={{ ...router.query, category: 'all', poi: poi.id + '' }}
        >
          <ImageWrapper
            onClick={e => e.nativeEvent.stopPropagation()}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
          >
            <MarkerImage src={poi.image_url} key={poi.id} />
            <LabelWrapper>
              <ImageLabel>{poi.name}</ImageLabel>
            </LabelWrapper>
          </ImageWrapper>
        </Link>
      ) : null}
    </AnimatePresence>
  );
};
