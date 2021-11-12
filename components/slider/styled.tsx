import { LabelWrapper } from 'components/marker/styled';
import { motion } from 'framer-motion';
import Image, { ImageLoader, ImageProps } from 'next/image';
import styled from 'styled-components';

export const Footer = styled(motion.div)`
  position: absolute;
  pointer-events: auto;
  width: 100%;
  bottom: 0px;
`;

export const SliderLabel = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 0;
  /* 
  transform: translate(-50%, -150%); */
  z-index: 2;
  text-align: center;
  background-color: var(--color-white);
  box-shadow: var(--shadow-4);
  font-weight: 700;
  font-size: 13px;
  padding: 0.5rem;
  line-height: 1;
  border-radius: 8px;
`;

export const EmblaMain = styled.div`
  overflow: hidden;
`;

export const EmblaContainer = styled.div`
  display: flex;
`;

export const EmblaSlide = styled(motion.div)`
  position: relative;
  flex: 0 0 20%;
  border: 2px solid white;
  & + & {
    border-left: none;
  }
`;

const imageLoader: ImageLoader = ({ src, width }) => {
  // https://photo.hotellook.com/static/as_trap/districts/922/{width}x{height}/159e9c97-35f1-4777-8619-c76ab68824c1.jpg
  // https://photo.hotellook.com/static/as_trap/pois/3476/{width}x{height}/5f43a31c-90ba-4d8e-bcaf-4ee6a2f55312.jpg
  const [type] = src.match(/(?<=as_trap\/)\w*/) || [];
  const [id] = src.match(/\d*(?=\/\{width\})/) || [];
  const [url] = src.match(/(?<=\{height\}\/).*\.jpg$/) || [];
  return `https://photo.hotellook.com/static/as_trap/${type}/${id}/${width}x${width}/${url}`;
};

export const ImageWrapper = styled(motion.div)`
  z-index: 2;
`;
export const SlideImage = styled(Image).attrs(
  (): Partial<ImageProps> => ({
    quality: 10,
    width: 150,
    height: 150,
    layout: 'responsive',
    loader: imageLoader
  })
)`
  background-color: var(--color-ink-300);
`;

export const StyledLabelWrapper = styled(LabelWrapper)`
  /* z-index: 2; */
  /* bottom: 200px; */
  transform: translateX(-50%);
`;
