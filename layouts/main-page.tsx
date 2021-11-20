import { Categories } from 'components/categories';
import { FC } from 'react';
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
  return state.isMainPage ? (
    <Wrapper>
      <div>Header</div>
      <div>Cards</div>
      <Categories />
    </Wrapper>
  ) : null;
};
