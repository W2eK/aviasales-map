import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 4rem;
  position: relative;
  text-align: center;
  --margin: 3rem;
`;

export const Fadeout = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 6rem;
  z-index: -1;
  background: linear-gradient(
    180deg,
    rgba(239, 241, 244, 1),
    rgba(239, 241, 244, 0.5) 70%,
    rgba(239, 241, 244, 0)
  );
`;
export const IconHolder = styled.div`
  position: absolute;
  width: var(--margin);
  height: var(--margin);
  left: 0;
  top: 0;
  color: var(--color-graphite-500);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  line-height: 0;
  pointer-events: auto;
`;

export const Content = styled.header`
  padding: .6rem var(--margin);
  position: absolute;
  width: 100%;
  pointer-events: auto;
`;

export const Title = styled.h2`
  /* font-size: 2em; */
  font-family: var(--font-display);
  margin: 0;
  letter-spacing: 0.02em;
`;

export const Subtitle = styled.p`
  /* font-size: 1.6em; */
  font-weight: 300;
  margin: 0 auto;
`;
