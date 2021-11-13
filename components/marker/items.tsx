import { EmblaSlide, SlideImage } from 'components/slider/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Poi } from 'interfaces/city.interface';
import { FC, memo } from 'react';

type SliderItemsProps = { pois: Poi[] };

const SliderItems: FC<SliderItemsProps> = ({ pois }) => {
  const router = useRouter();
  const items = pois.map(poi => (
    <EmblaSlide key={poi.id}>
      <Link
        href={{
          pathname: '/[city]/[poi]',
          query: { ...router.query, poi: poi.id }
        }}
        passHref
      >
        <SlideImage src={poi.image_url} />
      </Link>
    </EmblaSlide>
  ));
  return <>{items}</>;
};

const Memorized = memo(SliderItems);
export { Memorized as SliderItems };
