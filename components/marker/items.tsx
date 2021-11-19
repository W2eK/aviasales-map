import { EmblaSlide } from 'components/slider/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Poi } from 'interfaces/data.interface';
import { FC, memo } from 'react';
import styled from 'styled-components';
import { Card } from 'components/card';

type SliderItemsProps = { pois: Poi[] };

const Test = styled.div``;

const SliderItems: FC<SliderItemsProps> = ({ pois }) => {
  const router = useRouter();
  const items = pois.map(poi => (
    <EmblaSlide key={poi.id}>
      <Card poi={poi} />
    </EmblaSlide>
  ));
  return <>{items}</>;
};

const Memorized = memo(SliderItems);
export { Memorized as SliderItems };
