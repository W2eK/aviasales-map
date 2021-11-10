import { EmblaSlide, SlideImage } from 'components/slider/styled';
import { Poi } from 'interfaces/city.interface';
import { FC, memo } from 'react';

type SliderItemsProps = { pois: Poi[] };

const SliderItems: FC<SliderItemsProps> = ({ pois }) => {
  const items = pois.map(poi => (
    <EmblaSlide key={poi.id}>
      <SlideImage src={poi.image_url} />
    </EmblaSlide>
  ));
  return <>{items}</>;
};

const Memorized = memo(SliderItems);
export { Memorized as SliderItems };
