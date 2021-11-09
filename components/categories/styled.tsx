import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: calc((100% - 300px) / 2);
  left: 0;
  transform: translateY(-50%);
  margin-left: 1rem;
`;

export const RadioContainer = styled(motion.div)`
  position: relative;
  pointer-events: auto;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.25rem 0;
`;

export const LabelWrapper = styled.label`
  font-size: 0.75rem;
  color: var(--color-white);
  white-space: nowrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  /* transform: translate(-50%, -50%); */
`;

const labelVariants: Variants = {
  active: { x: 0 },
  inactive: { x: '-100%' }
};

export const LabelContent = styled(motion.span).attrs(() => ({
  variants: labelVariants
}))`
  background-color: rgba(0, 0, 0, 0.25);
  padding: 0.25rem 0.5rem 0.25rem 1.75rem;
  line-height: 1;
  border-radius: 4px;
  display: block;
`;

const iconVariants: Variants = {
  active: { color: 'var(--color-white)' },
  inactive: { color: 'var(--color-ink-400)' }
};

export const IconHolder = styled(motion.div).attrs(() => ({
  variants: iconVariants
}))`
  color: var(--color-ink-400);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 0;
`;

const radioVariants: Variants = {
  active: { backgroundColor: 'var(--color-primary-500)', scale: 1 },
  inactive: { backgroundColor: 'var(--color-white)', scale: 0.7 }
};

export const RadioButton = styled(motion.input).attrs(() => ({
  type: 'radio',
  name: 'category',
  variants: radioVariants
}))`
  margin: 0;
  position: absolute;
  /* top: 50%; */
  /* left: 50%; */
  transform: translate(-50%, -50%);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-shadow: var(--shadow-7);
  background-color: var(--color-white);
  appearance: none;
`;
