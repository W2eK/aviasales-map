import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { PoiType, poiTypes } from 'interfaces/data.interface';
import { CityPageProps } from 'interfaces/city.interface';
import { IATA, iataCodes } from 'interfaces/iata.interface';
import { isDev } from 'utils/is-dev';

export type CityParams = {
  city: IATA;
};

const CityPage: NextPage<CityPageProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default CityPage;

export const getStaticProps: GetStaticProps<CityPageProps, CityParams> =
  async ({ params }) => {
    if (!params || !('city' in params)) return { notFound: true };
    if (isDev) console.log('city', params);
    try {
      const iata = params.city;
      const props = await aviasalesApi.requestPageProps({ iata });
      return { props };
    } catch (err) {
      console.warn(err);
      return { notFound: true };
    }
  };

export const getStaticPaths: GetStaticPaths<CityParams> = async () => {
  const places = await aviasalesApi.requestPlaces();
  const cities = places
    .map(({ iata }) => `/${iata.toLocaleLowerCase()}`)
    .slice(0, 1) as IATA[];
  const paths = cities.map(city => ({ params: { city } }));
  return {
    paths,
    fallback: true
  };
};
