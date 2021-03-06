import { FC, useEffect } from 'react';
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
  height: 100vh;
  /* https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
  height: calc(var(--vh, 1vh) * 100);
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
    /* height: 100vh; */
    /* height: calc(var(--vh, 1vh) * 100); */
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

const Contacts = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  color: var(--color-white);
  font-size: 12px;
  padding: 1rem;
  opacity: 0.3;
`;

export const Background: FC = ({ children }) => {
  useEffect(() => {
    const resize = () => {
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', resize);
    resize();
  }, []);
  return (
    <Wrapper>
      <Headline>Поиск дешёвых авиабилетов</Headline>
      <Backdrop />
      <Overlay>{children}</Overlay>
      <Contacts>
        author:{' '}
        <a
          href="https://github.com/W2eK"
          target="_blank"
          rel="noopener noreferrer"
        >
          w2ek
        </a>
      </Contacts>
    </Wrapper>
  );
};
