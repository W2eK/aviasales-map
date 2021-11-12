import Head from 'next/head';
import { DistrictsGeojson } from 'interfaces/districts.interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { City, IATA } from 'interfaces/city.interface';
import { CityLayout } from 'layouts/city';

export interface CityPageProps {
  page: 'city';
  districts: DistrictsGeojson;
  city: City;
}

const CityPage: NextPage<CityPageProps> = ({ city }) => {
  // if(!city?.title) debugger
  return (
    <>
      <Head>
        <title>{city?.title}</title>
      </Head>
      {city?.title ? <CityLayout /> : null}
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
    const districtsPolygons = await aviasalesApi.requestPolygons({ iata });
    const city = await aviasalesApi.requestCity({ iata });
    return {
      props: {
        page: 'city',
        districts: districtsPolygons,
        city
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
    .slice(0, 5);
  return {
    paths: cities,
    fallback: true
  };
};
