import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  z-index: -1;
`;

export const EmblaMain = styled.div`
  overflow: hidden;
  pointer-events: auto;
  width: 100%;
  /* background-color: red; */
`;
export const EmblaContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(100% - 2rem - 4rem);
  grid-column-gap: 1rem;
  /* display: flex; */
`;
export const EmblaSlide = styled.div`
  /* flex: 0 0 calc(100% - 2rem - 4rem); */
  position: relative;
  aspect-ratio: 1/1;
`;

export const SlideContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--color-ink-200);
  /* // ! SHADOW DROP PERFORMANCE ON MOBILE CHROME */
  /* box-shadow: var(--shadow-2); */
  border-radius: 1rem 1rem 0 0;
`;
