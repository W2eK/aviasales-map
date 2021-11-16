import Head from 'next/head';
import { DistrictsGeojson } from 'interfaces/districts.interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { City, IATA } from 'interfaces/city.interface';
import { CityLayout } from 'layouts/city';

export type CityPageProps = City & {
  page: 'city';
  geojson: {
    districts: DistrictsGeojson;
  };
};

const CityPage: NextPage<CityPageProps> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {title ? <CityLayout /> : null}
    </>
  );
};

export default CityPage;

export const getStaticProps: GetStaticProps<CityPageProps> = async ({
  params
}) => {
  if (!params || Array.isArray(params.city) || params.city?.length !== 3)
    return { notFound: true };
  try {
    const iata = params.city as IATA;
    console.log(params);
    const districts = await aviasalesApi.requestPolygons({ iata });
    const city = await aviasalesApi.requestCity_({ iata });
    return {
      props: {
        page: 'city',
        ...city,
        geojson: {
          ...city.geojson,
          districts
        }
      }
    };
  } catch (err) {
    console.warn(err);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const places = await aviasalesApi.requestPlaces();
  const cities = places
    .map(({ iata }) => `/${iata.toLocaleLowerCase()}`)
    // .slice(0, 5);
  return {
    paths: cities,
    fallback: true
  };
};
