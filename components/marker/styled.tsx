import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ImageWrapper = styled(motion.div)`
  width: 12rem;
  height: 12rem;
  border-radius: 2rem;
  border: 4px solid white;
  overflow: hidden;
  /* position: relative; */
`;

export const LabelWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, calc(50% - 4px));
  /* width:  */
  /* max-width: 100%; */
`;

export const ImageLabel = styled.div`
  text-align: center;
  background-color: var(--color-white);
  box-shadow: var(--shadow-4);
  font-weight: 700;
  font-size: 13px;
  padding: 0.5rem;
  line-height: 1;
  border-radius: 8px;
  white-space: nowrap;
  /* position: relative; */
  /* word-spacing: nowrap; */
`;