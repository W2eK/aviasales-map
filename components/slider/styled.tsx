import { motion } from 'framer-motion';
import Image, { ImageLoader, ImageProps } from 'next/image';
import styled from 'styled-components';

export const Footer = styled(motion.div)`
  position: absolute;
  pointer-events: auto;
  /* --img-width: min(50vw, calc(428px / 2)); */
  /* overflow: hidden; */
  width: 100%;
  bottom: 0px;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  /* background-color: var(--color-white); */
  /* overflow-y: scroll; */
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
  flex: 0 0 30%;
  border: 4px solid white;
  & + & {
    border-left: none;
  }
  /* margin-right: 20px; */
  /* border: 1px solid black; */
`;

// export const ImageList = styled.div`
//   width: 100%;
//   height: var(--img-width);
//   scroll-snap-type: x mandatory;
//   display: flex;
//   overflow-x: scroll;
// `;

// export const ListItem = styled.div`
//   border: 4px solid white;
//   flex: 0 0 var(--img-width);
//   scroll-snap-align: center;
//   /* height: 100%; */
// `;

const imageLoader: ImageLoader = ({ src, width }) => {
  // https://photo.hotellook.com/static/as_trap/pois/3476/{width}x{height}/5f43a31c-90ba-4d8e-bcaf-4ee6a2f55312.jpg
  const [id] = src.match(/(?<=pois\/)\d*/) || [];
  const [url] = src.match(/(?<=\{height\}\/).*\.jpg$/) || [];
  return `https://photo.hotellook.com/static/as_trap/pois/${id}/${width}x${width}/${url}`;
};

export const ImageWrapper = styled(motion.div)`
  z-index: 2;
`;
export const SlideImage = styled(Image).attrs(
  (): Partial<ImageProps> => ({
    quality: 10,
    width: 250,
    height: 250,
    layout: 'responsive',
    loader: imageLoader
  })
)`
  background-color: var(--color-ink-300);
`;
