import { motion, Variant } from 'framer-motion';
import { FC } from 'react';
import { Image, ImageFadeOut, ImageWrapper } from './styled';

type CardImageProps = {
  src: string;
  alt: string;
  muted: boolean;
};

export const CardImage: FC<CardImageProps> = ({ src, alt, muted }) => {
  // const FadeVariants: Variant = {muted: }
  return (
    <ImageWrapper>
      <motion.div
        animate={
          muted
            ? { filter: 'brightness(.6) blur(10px)', margin: '-1rem' }
            : { filter: 'brightness(1) blur(0px)', margin: 0 }
        }
        transition={{ease: 'easeOut'}}
      >
        <Image src={src} alt={alt} />
      </motion.div>
      <ImageFadeOut />
    </ImageWrapper>
  );
};
