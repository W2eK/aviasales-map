import { Categories } from 'components/categories';
import { Headline } from 'components/headline';
import { Slider } from 'components/slider';
import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  pointer-events: none;
`;

export const CityLayout: FC = () => {
  return (
    <Wrapper>
      <Headline />
      {/* <Categories /> */}
      <Slider />
    </Wrapper>
  );
};
