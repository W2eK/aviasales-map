import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: grid;
  pointer-events: none;
  grid-template-rows: min-content 1fr min-content;
`;

export const CityLayout: FC = () => {
  return (
    <Wrapper>
      <div>Header</div>
      <div>Cards</div>
      <div>Categories</div>
    </Wrapper>
  );
};
