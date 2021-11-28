import { motion } from 'framer-motion';
import { CSSProperties, FC } from 'react';
import { PointerCircle, PointerOutline } from './styled';

type MapPointerProps = {
  scale: number;
  isActive: boolean;
  isHidden: boolean;
};

export const MapPointer: FC<MapPointerProps> = ({
  scale,
  isActive,
  isHidden
}) => {
  const style = { '--scale': scale } as CSSProperties;
  return (
    <PointerOutline
      style={style}
      as={motion.div}
      animate={{
        opacity: isHidden ? 0 : 1,
        backgroundColor: isActive
          ? 'rgba(6, 86, 254, 0.3)'
          : 'rgba(158, 169, 183, .3)'
      }}
    >
      <PointerCircle
        as={motion.div}
        animate={{
          scale: isActive ? 1 : 0.5,
          backgroundColor: isActive ? '#0c73fe' : '#9ea9b7'
        }}
      />
    </PointerOutline>
  );
};
