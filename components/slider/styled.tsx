import { LabelWrapper } from 'components/marker/styled';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const EmblaMain = styled(motion.div)`
  overflow: hidden;
  pointer-events: auto;
`;

export const EmblaContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(100% - 8rem);
  grid-gap: 1rem;
`;

export const EmblaSlide = styled(motion.div)`
  background-color: var(--color-ink-300);
  aspect-ratio: 3/4;
  border-radius: 0.5rem 0.5rem 0 0;
  overflow: hidden;
  box-shadow: var(--shadow-4);
`;

export const StyledLabelWrapper = styled(LabelWrapper)`
  /* z-index: 2; */
  /* bottom: 200px; */
  /* transform: translateX(-50%); */
`;
