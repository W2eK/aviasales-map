import { Categories } from 'components/categories';
import { Headline } from 'components/headline';
import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  pointer-events: none;
`;

export const CityLayout: FC = () => {
  return (
    <Wrapper>
      <Headline />
      <Categories />
    </Wrapper>
  );
};
