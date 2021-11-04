import Head from 'next/head';
import { CityMap } from 'interfaces/citymap.interface';
import { DistrictsGeoJSON } from 'interfaces/districts.interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { MapContainer } from 'components/map';

export interface CityPageProps {
  page: 'city';
  districts: DistrictsGeoJSON;
  cityMap: CityMap;
}

const CityPage: NextPage<CityPageProps> = ({ districts, cityMap }) => {
  return (
    <>
      <Head>
        <title>{cityMap?.title}</title>
      </Head>
      <pre>{JSON.stringify(cityMap, null, 2)}</pre>
    </>
  );
};

export default CityPage;

export const getStaticProps: GetStaticProps<CityPageProps> = async ({
  params
}) => {
  if (!params || params.city?.length !== 3) return { notFound: true };
  try {
    const iata = params.city as string;
    const districts = await aviasalesApi.requestDistricts({ iata });
    const cityMap = await aviasalesApi.requestDetails({ iata });
    return {
      props: {
        page: 'city',
        districts,
        cityMap
      }
    };
  } catch (err) {
    console.warn(err)
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const places = await aviasalesApi.requestPlaces();
  const cities = places.map(({ iata }) => `/${iata}`)//.slice(0, 5);
  return {
    paths: cities,
    fallback: true
  };
};
