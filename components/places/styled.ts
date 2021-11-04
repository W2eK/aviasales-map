import styled from 'styled-components';
import Image, { ImageLoader, ImageProps } from 'next/image';

export const List = styled.ul`
  height: 100%;
  overflow-y: scroll;
  margin: 0;
  padding: 1rem;
  list-style: none;
  background-color: white;
`;
export const Item = styled.li`
  position: relative;
  isolation: isolate;
  cursor: pointer;
  & + & {
    margin-top: 1rem;
  }
`;

const imageLoader: ImageLoader = ({ src, width }) =>
  `https://photo.hotellook.com/static/cities/${width}x${width}/${src}`;

export const ItemImage = styled(Image).attrs(
  (): Partial<ImageProps> => ({
    quality: 10,
    sizes: '(max-width: 428px) 100vw, 375px',
    layout: 'fill',
    objectFit: 'cover',
    loader: imageLoader
  })
)`
  z-index: -1;
  background-color: var(--color-ink-300);
`;

export const ItemText = styled.h2`
  margin: 0;
  padding: 1rem;
  color: white;
  font-family: var(--font-display);
  padding-top: min(40vw, 7rem);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 39%
  );
  line-height: 1;
  & span {
    font-size: 0.5em;
    font-family: var(--font-text);
  }
`;
