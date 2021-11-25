import { Categories } from 'components/categories';
import { Topbar } from 'components/topbar';
import { Slider } from 'components/slider';
import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  & > div:nth-child(2) {
    flex: 1;
  }
`;

export const MainPageLayout: FC = () => {
  const { state } = useStoreContext();
  return useMemo(
    () =>
      state.isMainPage ? (
        <Wrapper>
          <Topbar />
          <Slider />
          <Categories />
        </Wrapper>
      ) : null,
    [state.isMainPage]
  );
};
