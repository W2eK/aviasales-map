import NextImage, { ImageLoader, ImageProps } from 'next/image';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
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

export const Image = styled(NextImage).attrs(
  (): Partial<ImageProps> => ({
    // quality: 10,
    width: 400,
    height: 400,
    layout: 'intrinsic',
    objectFit: 'cover',
    loader: imageLoader
  })
)`
  background-color: var(--color-ink-300);
`;

export const ImageWrapper = styled.div`
  background-color: var(--color-ink-300);
  height: 100%;
  filter: blur(0px);
  /* cursor: pointer; */
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  /* // ! SHADOW DROP PERFORMANCE ON MOBILE CHROME */
  /* box-shadow: var(--shadow-2); */
`;

export const ImageFadeOut = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.3));
`;

export const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Text = styled.div`
  position: relative;
`;

export const Header = styled.h2`
  /* position: absolute; */
  /* bottom: 1rem; */
  font-family: var(--font-display);
  font-size: 1.75rem;
  line-height: 1;
  margin: 0;
`;

export const Paragraph = styled.p`
  position: absolute;
  top: 100%;
  /* margin: .5rem 0; */
`;
