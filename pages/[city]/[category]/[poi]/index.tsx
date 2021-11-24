import { PoiPageProps } from 'interfaces/props.interface';
import { IATA } from 'interfaces/iata.interface';
import { GetStaticPaths, GetStaticProps } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { CategoryParams } from '..';
import CityPage, { getStaticPaths as getCityStaticPaths } from '../..';

export type PoiParams = CategoryParams & {
  poi: string;
};

export default CityPage;

export const getStaticProps: GetStaticProps<PoiPageProps, PoiParams> = async ({
  params
}) => {
  if (!params || !('city' in params)) return { notFound: true };
  if (!('category' in params)) return { notFound: true };
  if (!('poi' in params) || isNaN(+params.poi)) return { notFound: true };
  // console.log('poi', params);
  try {
    const { category, poi: strPoi } = params;
    const iata = params.city.toUpperCase() as IATA;
    const poi = +strPoi;
    const props = await aviasalesApi.requestPageProps({ iata, category, poi });
    return { props };
  } catch (err) {
    console.warn(err);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths<PoiParams> = async context => {
  const { paths: cityPaths } = await getCityStaticPaths(context);
  const paths: { params: PoiParams }[] = [];
  for (let path of cityPaths) {
    if (typeof path === 'string') continue;
    const { city } = path.params;
    const data = await aviasalesApi.requestCity({ iata: city });
    const tabs = data.city_map.tabs;
    tabs.forEach(({ type: category, pins }) => {
      pins.forEach(({ id }) => {
        paths.push({ params: { city, category, poi: id + '' } });
      });
    });
    data.city_map.tabs
      .flatMap(({ pins }) => pins)
      .map(({ id }) => id)
      .forEach(id =>
        paths.push({ params: { city, category: 'all', poi: id + '' } })
      );
  }
  return {
    // paths: paths, 
    paths: [],
    fallback: true
  };
};
