import { FC, memo } from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

type SelectorProps = {
  collapsed: boolean;
  children: React.ReactNode;
};

const SelectorWrapper = styled(motion.div)`
  position: relative;
`;

const SelectorList = styled(motion.ul)`
  min-height: 4rem;
  display: grid;
  grid-auto-flow: column;
  padding: 0 1rem;
  pointer-events: auto;
  margin: 0;
  position: relative;
`;

const backgroundVariants: Variants = {
  collapsed: {
    scaleY: 1,
    background: `linear-gradient(
    0deg,
    rgba(239, 241, 244, 1) 20%,
    rgba(239, 241, 244, 1) 20%,
    rgba(239, 241, 244, 1) 70%,
    rgba(239, 241, 244, 1)
  )`
  },
  expanded: {
    scaleY: 1.5,
    background: `linear-gradient(
    0deg,
    rgba(239, 241, 244, 1) 20%,
    rgba(239, 241, 244, 0.95) 20%,
    rgba(239, 241, 244, 0.8) 70%,
    rgba(239, 241, 244, 0)
  )`
  }
};

const SelectorBackground = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`;

const Selector: FC<SelectorProps> = ({ children, collapsed }) => {
  const state = collapsed ? 'collapsed' : 'expanded';

  return (
    <SelectorWrapper animate={state}>
      <SelectorList
        variants={{
          collapsed: { y: '1.25rem' },
          expanded: { y: 0 }
        }}
      >
        <SelectorBackground
          variants={backgroundVariants}
          style={{ originY: 0 }}
        />
        {children}
      </SelectorList>
    </SelectorWrapper>
  );
};

const MemorizedSelector = memo(Selector);

export { MemorizedSelector as Selector };
