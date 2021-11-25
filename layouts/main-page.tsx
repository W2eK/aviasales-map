import { Categories } from 'components/categories';
import { Slider } from 'components/slider';
import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;

`;

export const MainPageLayout: FC = () => {
  const { state } = useStoreContext();
  return useMemo(
    () =>
      state.isMainPage ? (
        <Wrapper>
          <div></div>
          <Slider />
          <Categories />
        </Wrapper>
      ) : null,
    [state.isMainPage]
  );
};
