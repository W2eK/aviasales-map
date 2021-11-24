import { motion } from 'framer-motion';
import { Poi } from 'interfaces/data.interface';
import { FC } from 'react';
import { Description } from './description';
import { CardImage } from './image';
import { Content, Paragraph, Header, Image, Text, Wrapper } from './styled';

type CardContentProps = {
  poi: Poi;
  open: boolean;
  description: string | false;
};

export const CardContent: FC<CardContentProps> = ({
  poi,
  open,
  description
}) => {
  return (
    <Wrapper>
      <CardImage
        src={poi.image_url}
        alt={poi.description || poi.name}
        muted={open}
      />
      <Content
        style={{
          justifyContent: open ? 'flex-start' : 'flex-end'
        }}
      >
        <Text as={motion.div} layout="position" key={poi.name}>
          <Header>{poi.name}</Header>
          <Description>{description}</Description>
        </Text>
      </Content>
    </Wrapper>
  );
};
