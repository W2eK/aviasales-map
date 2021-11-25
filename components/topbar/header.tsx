import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { Content, Title, Subtitle } from './styled';

type HeaderProps = {
  title: string;
  subtitle: string | null;
};

export const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <AnimatePresence>
      <Content
        key={title}
        as={motion.header}
        initial={{ opacity: 0, y: '200%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '-200%' }}
        transition={{ ease: 'easeInOut' }}
      >
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Content>
    </AnimatePresence>
  );
};
