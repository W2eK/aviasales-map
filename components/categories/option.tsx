import { FC, memo, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Category, PoiType } from 'interfaces/data.interface';
import { ParsedUrlQuery } from 'querystring';
import { Icon } from 'components/icon';

type OptionProps = PropsWithChildren<{
  type: PoiType;
  pinned: boolean;
  selected: boolean;
  collapsed: boolean;
}>;

const OptionWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* line-height: 0; */
  height: 100%;
`;

const IconBackground = styled.div`
  position: absolute;
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  z-index: -1;
`;

const IconHolder = styled.div`
  position: relative;
  color: var(--color-ink-400);
`;

const OptionLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`;

const Option: FC<OptionProps> = ({
  type,
  pinned,
  selected,
  children,
  collapsed
}) => {
  return (
    <OptionWrapper>
      <IconHolder
        as={motion.div}
        animate={{
          color:
            pinned && selected ? 'var(--color-white)' : 'var(--color-ink-400)'
        }}
      >
        <IconBackground
          as={motion.div}
          style={{ x: '-25%' }}
          animate={{
            backgroundColor: pinned
              ? 'var(--color-primary-800)'
              : 'var(--color-ink-800)',
            opacity: selected ? (pinned ? 1 : 0.1) : 0
          }}
        />
        <Icon category={type} />
      </IconHolder>
      <OptionLabel
        as={motion.div}
        animate={{ opacity: !collapsed && selected ? 1 : 0 }}
      >
        {children}
      </OptionLabel>
    </OptionWrapper>
  );
};

const MemorizedOption = memo(Option);

export { MemorizedOption as Option };
