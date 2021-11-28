import { CategoryPageProps } from 'interfaces/props.interface';
import { Category, CategoryType, PoiType } from 'interfaces/data.interface';
import { IATA } from 'interfaces/iata.interface';
import { GetStaticPaths, GetStaticProps } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import CityPage, { CityParams, getStaticPaths as getCityStaticPaths } from '..';

export type CategoryParams = CityParams & {
  category: CategoryType;
};

export default CityPage;

export const getStaticProps: GetStaticProps<CategoryPageProps, CategoryParams> =
  async ({ params }) => {
    if (!params || !('city' in params)) return { notFound: true };
    if (!('category' in params)) return { notFound: true };
    // console.log('category', params);
    try {
    const { category } = params;
      const iata = params.city.toUpperCase() as IATA;
      const props = await aviasalesApi.requestPageProps({ iata, category });
      return { props };
    } catch (err) {
      console.warn(err);
      return { notFound: true };
    }
  };

export const getStaticPaths: GetStaticPaths<CategoryParams> = async context => {
  const { paths: cityPaths } = await getCityStaticPaths(context);
  const paths: { params: CategoryParams }[] = [];
  for (let path of cityPaths) {
    if (typeof path === 'string') continue;
    const city = path.params.city;
    const data = await aviasalesApi.requestCity({ iata: city });
    const categories: CategoryType[] = data.city_map.tabs.map(
      ({ type }) => type
    );
    categories.push('all');
    categories.forEach(category => {
      paths.push({ params: { city, category } });
    });
  }
  return {
    paths,
    fallback: false
  };
};
