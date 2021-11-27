import { useRouter } from 'next/router';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { Poi } from 'interfaces/data.interface';
import { FC } from 'react';
import {
  PopupLabel,
  PopupWrapper,
  LabelWrapper,
  PopupImage,
  ImageWrapper
} from './styled';
import { Link } from 'components/shared/link';

type PopupProps = { poi: Poi };

export const Popup: FC<PopupProps> = ({ poi }) => {
  return (
    <PopupWrapper>
      <ImageWrapper>
        <PopupImage src={poi.image_url} key={poi.id} />
      </ImageWrapper>
      <LabelWrapper>
        <PopupLabel>{poi.name}</PopupLabel>
      </LabelWrapper>
    </PopupWrapper>
  );
};

type PopupWrapperProps = {
  initial: MotionProps['initial'];
};

export const PopupWrapper_: FC<PopupWrapperProps> = ({ initial }) => {
  return <motion.div initial={initial}></motion.div>;
};
