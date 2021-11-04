import { FC } from 'react';
import styled from 'styled-components';

const Headline = styled.h1`
  font-size: 2.75rem;
  color: white;
  font-family: var(--font-display);
  font-weight: 700;
  text-align: center;
  position: absolute;
  top: 30%;
  z-index: -1;
  white-space: nowrap;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: -1;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  overflow: hidden;
  position: relative;
  @media (orientation: portrait) and (max-width: 428px) {
    padding: 0;
  }
`;

const Overlay = styled.main`
  background-color: white;
  aspect-ratio: auto 1/2;
  height: 100%;
  max-height: 926px;
  border-radius: 1.5rem;
  box-shadow: var(--shadow-10);
  overflow: hidden;
  @media (orientation: portrait) and (max-width: 428px) {
    aspect-ratio: initial;
    width: 100%;
    border-radius: 0;
  }
  position: relative;
  & > *:last-child {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
  }
`;

export const Background: FC = ({ children }) => {
  return (
    <Wrapper>
      <Headline>Поиск дешёвых авиабилетов</Headline>
      <Backdrop />
      <Overlay>
        {children}
      </Overlay>
    </Wrapper>
  );
};
