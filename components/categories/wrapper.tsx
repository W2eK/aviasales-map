import { FC, memo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  height: 2.5rem;
`;

type WrapperProps = {
  hidden: boolean;
  children: React.ReactNode;
};

const Wrapper: FC<WrapperProps> = ({ children, hidden }) => {
  return (
    <StyledWrapper
      as={motion.div}
      animate={{ y: hidden ? 'calc(100% + 4rem)' : 0 }}
    >
      {children}
    </StyledWrapper>
  );
};

const MemorizedWrapper = memo(Wrapper);

export { MemorizedWrapper as Wrapper };
