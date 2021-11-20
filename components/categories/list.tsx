import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { Background, List, Wrapper } from './styled';

type ListProps = {
  collapsed: boolean;
  children?: ReactNode;
};

export const CategoriesList: FC<ListProps> = ({ children, collapsed }) => {
  return (
    <Wrapper>
      <Background animate={collapsed ? 'collapsed' : 'expanded'} />
      <List as={motion.ul} animate={{ y: collapsed ? 0 : '-1.5rem' }}>
        {children}
      </List>
    </Wrapper>
  );
};
