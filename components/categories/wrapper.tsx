import { FC, memo } from 'react';
import { motion } from 'framer-motion';

type WrapperProps = {
  hidden: boolean;
  children: React.ReactNode;
};

const Wrapper: FC<WrapperProps> = ({ children, hidden }) => {
  return (
    <motion.div animate={{ y: hidden ? 'calc(100% + 1.25rem)' : 0 }}>
      {children}
    </motion.div>
  );
};

const MemorizedWrapper = memo(Wrapper);

export { MemorizedWrapper as Wrapper };
