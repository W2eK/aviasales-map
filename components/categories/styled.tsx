import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 2.5rem;
  pointer-events: auto;
  position: relative;
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0 1rem;
  height: 4rem;
`;

export const Item = styled.li`
  flex: 1;
  cursor: pointer;
`;

export const ItemContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0.6rem 0;
  align-items: center;
`;

export const IconWrapper = styled.div<{ 'data-selected': boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-ink-400);
  &[data-selected='true'] {
    color: var(--color-white);
  }
`;

export const ItemIndicator = styled.div<{ 'data-selected': boolean }>`
  position: absolute;
  z-index: -1;
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  background-color: rgba(158, 169, 183, 0.25);
  &[data-selected='true'] {
    background-color: var(--color-primary-500);
  }
`;

export const ItemLabel = styled.div<{ 'data-collapsed': boolean }>`
  text-align: center;
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 95%);
  color: var(--color-ink-500);
  line-height: 2;
  &[data-collapsed='true'] {
    opacity: 0;
  }
`;

const backgroundVariants: Variants = {
  collapsed: {
    scaleY: 1,
    background: `linear-gradient(
    0deg,
    rgba(239, 241, 244, 1),
    rgba(239, 241, 244, 1) 70%,
    rgba(239, 241, 244, 1)
  )`
  },
  expanded: {
    scaleY: 1.6,
    background: `linear-gradient(
    0deg,
    rgba(239, 241, 244, 1),
    rgba(239, 241, 244, 0.5) 70%,
    rgba(239, 241, 244, 0)
  )`
  }
};

export const Background = styled(motion.div).attrs(() => ({
  variants: backgroundVariants,
  style: { originY: '100%' }
}))`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  /* bottom: 0; */
`;
