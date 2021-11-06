import Head from 'next/head';
import { DistrictsPolygonsGeojson } from 'interfaces/districts.interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { City, IATA } from 'interfaces/city.interface';

export interface CityPageProps {
  page: 'city';
  districtsPolygons: DistrictsPolygonsGeojson;
  city: City;
}

const CityPage: NextPage<CityPageProps> = ({ districtsPolygons, city }) => {
  return (
    <>
      <Head>
        <title>{city?.title}</title>
      </Head>
      <h1>{city?.title}</h1>
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
        districtsPolygons,
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
  const cities = places.map(({ iata }) => `/${iata.toLocaleLowerCase()}`).slice(0, 5);
  return {
    paths: cities,
    fallback: true
  };
};
