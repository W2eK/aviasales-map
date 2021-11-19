import styled from 'styled-components';
import Image, { ImageLoader, ImageProps } from 'next/image';

export const CardWrapper = styled.div`
height: 100%;
`;

const imageLoader: ImageLoader = ({ src, width }) => {
  // https://photo.hotellook.com/static/as_trap/districts/922/{width}x{height}/159e9c97-35f1-4777-8619-c76ab68824c1.jpg
  // https://photo.hotellook.com/static/as_trap/pois/3476/{width}x{height}/5f43a31c-90ba-4d8e-bcaf-4ee6a2f55312.jpg
  const [type] = src.match(/(?<=as_trap\/)\w*/) || [];
  const [id] = src.match(/\d*(?=\/\{width\})/) || [];
  const [url] = src.match(/(?<=\{height\}\/).*\.jpg$/) || [];
  return `https://photo.hotellook.com/static/as_trap/${type}/${id}/${width}x${width}/${url}`;
};

export const ImageWrapper = styled.div`
  z-index: 2;
  position: relative;
  height: 100%;
`;
export const CardImage = styled(Image).attrs(
  (): Partial<ImageProps> => ({
    // quality: 10,
    // width: 400,
    // height: 400,
    layout: 'fill',
    objectFit: 'cover',
    loader: imageLoader
  })
)`
  background-color: var(--color-ink-300);
  height: 100%;
  /* cursor: pointer; */
`;
