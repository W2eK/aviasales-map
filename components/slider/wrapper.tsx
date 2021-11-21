import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { Wrapper } from './styled';

type WrapperProps = {
  children?: ReactNode;
  showContent: boolean;
};

export const SliderWrapper: FC<WrapperProps> = ({ children, showContent }) => {
  return (
    <AnimatePresence>
      {showContent ? (
        <Wrapper
          key="main"
          as={motion.div}
          variants={{
            initial: { opacity: 1, y: '100%' },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{ ease: showContent ? 'easeOut' : 'easeIn' }}
          initial="initial"
          animate="animate"
          exit="initial"
        >
          {children}
        </Wrapper>
      ) : (
        <div key="placeholder"></div>
      )}
    </AnimatePresence>
  );
};
