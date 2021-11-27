import { motion } from 'framer-motion';
import styled from 'styled-components';
import Image, { ImageLoader, ImageProps } from 'next/image';

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
  border-radius: 2rem;
  overflow: hidden;
  border: 4px solid white;
  /* box-sizing: content-box; */
`;
export const PopupImage = styled(Image).attrs(
  (): Partial<ImageProps> => ({
    width: 150,
    height: 150,
    layout: 'intrinsic',
    loader: imageLoader
  })
)`
  background-color: var(--color-ink-300);
`;

export const PopupWrapper = styled(motion.div)`
  /* width: 10rem; */
  /* height: 10rem; */
  cursor: pointer;
  position: relative;
  line-height: 0;
`;

export const LabelWrapper = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, calc(-50% - 4px));
`;

export const PopupLabel = styled.div`
  text-align: center;
  background-color: var(--color-white);
  box-shadow: var(--shadow-4);
  font-weight: 700;
  font-size: 13px;
  padding: 0.5rem;
  line-height: 1;
  border-radius: 8px;
  white-space: nowrap;
`;

export const DistrictLabel = styled(PopupLabel)`
  background-color: var(--color-primary-500);
  color: var(--color-white);
  cursor: pointer;
`;
