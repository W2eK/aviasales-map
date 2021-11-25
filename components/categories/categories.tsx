import { FC, useMemo } from 'react';
import { MainPageContext, useStoreContext } from 'store/context';
import { CategoryItem } from './item';
import { CategoriesList } from './list';
import { Item, List, Wrapper } from './styled';

export const Categories: FC = () => {
  const { state } = useStoreContext() as MainPageContext;
  const collapsed = state.isDetailPage;
  return useMemo(
    () => (
      <CategoriesList collapsed={collapsed}>
        {state.pageProps.categories.map(category => (
          <CategoryItem
            key={category.type}
            category={category}
            currentCategory={state.currentCategory}
            hoverType={state.hoverType}
            collapsed={collapsed}
            hoverDistrict={!!state.hoverDistrict}
          >
            {category.title}
          </CategoryItem>
        ))}
      </CategoriesList>
    ),
    [state.currentCity, state.currentCategory, state.hoverType, !!state.hoverDistrict, collapsed]
  );
};
