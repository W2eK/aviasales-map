import { Category } from 'interfaces/data.interface';
import { useRouter } from 'next/router';
import { FC } from 'react';
import {
  Item,
  ItemIndicator,
  ItemContent,
  ItemLabel,
  IconWrapper
} from './styled';
import { Link } from 'components/shared/link';
import { MainPageParams } from 'interfaces/params.interface';
import { motion } from 'framer-motion';
import { Icon } from 'components/icon';
import { StoreState } from 'store/state';

type ItemProps = Pick<StoreState, 'currentCategory' | 'hoverType'> & {
  category: Category;
  collapsed: boolean;
};

export const CategoryItem: FC<ItemProps> = ({
  category,
  collapsed,
  currentCategory,
  hoverType
}) => {
  const params = useRouter().query as MainPageParams;
  const isSelected = category.type === currentCategory;
  const isHighlighted =
    currentCategory === null || currentCategory === 'all'
      ? category.type === hoverType
      : isSelected;
  return (
    <Item>
      <Link
        pathname={isSelected ? '/[city]' : '/[city]/[category]'}
        query={
          isSelected
            ? { city: params.city }
            : { ...params, category: category.type }
        }
      >
        <ItemContent>
          <IconWrapper
            as={motion.div}
            data-selected={isSelected}
            animate={{ y: collapsed ? '-.75rem' : 0 }}
          >
            <Icon category={category.type} />
            {isHighlighted ? (
              <ItemIndicator
                data-selected={isSelected}
                // layoutId="category-indicator"
              >
                <ItemLabel data-collapsed={collapsed}>
                  {category.title}
                </ItemLabel>
              </ItemIndicator>
            ) : null}
          </IconWrapper>
        </ItemContent>
      </Link>
    </Item>
  );
};
