import { Categories } from 'components/categories';
import { Slider } from 'components/slider';
import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: grid;
  pointer-events: none;
  grid-template-rows: min-content 1fr min-content;
`;

export const MainPageLayout: FC = () => {
  const { state } = useStoreContext();
  return useMemo(
    () =>
      state.isMainPage ? (
        <Wrapper>
          <div>Header</div>
          <Slider />
          <Categories />
        </Wrapper>
      ) : null,
    [state.isMainPage]
  );
};
