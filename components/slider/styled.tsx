import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  z-index: -1;
  width: 100%;
`;

export const EmblaMain = styled.div`
  pointer-events: auto;
  width: 100%;
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2) 30%,
    rgba(0, 0, 0, 0.4)
  );
`;

export const EmblaButton = styled.button`
  outline: 0;
  border: none;
  background: none;
  width: 2rem;
  height: 100%;
  position: absolute;
  top: 0;
  &:last-child {
    right: 0;
  }
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
  /* background-color: red; */
`;
export const EmblaContainer = styled.div`
  /* display: grid; */
  /* grid-auto-flow: column; */
  /* grid-auto-columns: calc(100% - 2rem - 4rem); */
  /* grid-column-gap: 1rem; */
  display: flex;
`;
export const EmblaSlide = styled.div`
  flex: 0 0 calc(100% - 2rem - 4rem);
  margin-right: 1rem;
  position: relative;
  aspect-ratio: 1/1;
`;

export const EmblaPlaceholder = styled.div`
  flex: 0 0 10%;
  position: relative;
  /* background-color: var(--color-ink-200); */
  /* opacity: .5 */
`;
