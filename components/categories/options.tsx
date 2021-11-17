import { FC, memo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Category, PoiType } from 'interfaces/data.interface';
import { Option } from './option';

type OptionsProps = {
  categories: Category[];
  pinned: boolean;
  selected: PoiType | null;
  collapsed: boolean;
  renderLink: (option: JSX.Element, type: PoiType) => JSX.Element;
};

const ListItem = styled.li`
  list-style: none;
  a {
    display: block;
    height: 100%;
  }
`;

const Options: FC<OptionsProps> = ({
  categories,
  selected,
  pinned,
  collapsed,
  renderLink
}) => {
  const options = categories.map(({ type, title }) => (
    <ListItem key={type}>
      {renderLink(
        <Option
          selected={selected === type}
          pinned={pinned}
          type={type}
          collapsed={collapsed}
        >
          {title}
        </Option>,
        type
      )}
    </ListItem>
  ));
  return <>{options}</>;
};

const MemorizedOptions = memo(Options);

export { MemorizedOptions as Options };
