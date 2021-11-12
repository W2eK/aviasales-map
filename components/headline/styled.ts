import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

const transition = {};
// const transition = {  duration: 5 };
// const transition = {  duration: .4 };

const headerVariant: Variants = {
  empty: { opacity: 0, transition },
  full: { opacity: 1, transition }
};

export const Header = styled(motion.div).attrs(() => ({
  variants: headerVariant
}))`
  text-align: center;
  background: linear-gradient(
    var(--color-ink-50) 20%,
    rgba(239, 241, 244, 0.95) 20%,
    rgba(239, 241, 244, 0.8) 70%,
    rgba(255, 255, 255, 0)
  );
  pointer-events: none;
  position: relative;
  /* height: 8rem; */
  /* height: auto; */
  min-height: 8rem;
  /* padding: 1rem 1rem 3rem; */
`;

const wrapperVariants: Variants = {
  // initial: position => ({
  //   y: position.y,
  //   x: position.x,
  //   opacity: 0,
  //   height: 0
  // }),
  initial: { y: 100, opacity: 0, transition },
  animate: { y: 0, opacity: 1, transition },
  exit: { y: -200, opacity: 0, transition }
};

export const Wrapper = styled(motion.div).attrs(() => ({
  variants: wrapperVariants,
  initial: 'initial',
  animate: 'animate',
  exit: 'exit'
}))`
  pointer-events: auto;
  cursor: pointer;
  position: absolute;
  margin: 1rem auto;
  padding: 0 1rem;
  width: 100%;
  /* color: var(--color-primary-800); */
  /* margin: 1rem; */
`;

export const Title = styled.h2`
  font-size: 2em;
  font-family: var(--font-display);
  margin: 0;
`;

export const Subtitle = styled.div`
  /* font-size: 1.6em; */
  font-weight: 300;
  margin: 0 auto;
`;
