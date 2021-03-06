import { motion } from 'framer-motion';
import { Poi } from 'interfaces/data.interface';
import { FC } from 'react';
import { CardImage } from './image';
import {
  Content,
  Header,
  Paragraph,
  Text,
  Wrapper
} from './styled';
import { useDescription } from './use-description';

type CardContentProps = {
  poi: Poi;
  isOpen: boolean;
};

export const CardContent: FC<CardContentProps> = ({ poi, isOpen }) => {
  const [ref, description] = useDescription({ id: poi.id, type: poi.type });
  return (
    <Wrapper key={poi.name}>
      <div ref={ref}></div>
      <CardImage
        src={poi.image_url}
        alt={poi.description || poi.name}
        muted={isOpen}
      />
      <Content
        style={{
          justifyContent: isOpen ? 'flex-start' : 'flex-end'
        }}
        key={poi.name}
      >
        <Text as={motion.div} layout key={poi.name}>
          <Header>{poi.name}</Header>
          <Paragraph>{description}</Paragraph>
        </Text>
      </Content>
    </Wrapper>
  );
};
