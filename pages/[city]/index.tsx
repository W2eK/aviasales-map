import Head from 'next/head';
import { CityMap } from 'interfaces/citymap.interface';
import { DistrictsGeoJSON } from 'interfaces/districts.interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';

interface CityPageProps {
  districts: DistrictsGeoJSON;
  cityMap: CityMap;
}

const CityPage: NextPage<CityPageProps> = ({ districts, cityMap }) => {
  return (
    <>
      <Head>
        <title>{cityMap?.title}</title>
      </Head>
      <pre>{JSON.stringify(districts, null, 2)}</pre>
    </>
  );
};

export default CityPage;

export const getStaticProps: GetStaticProps<CityPageProps> = async ({
  params
}) => {
  if (!params || params.city?.length !== 3) return { notFound: true };
  const iata = params.city as string;
  const districts = await aviasalesApi.requestDistricts({ iata });
  const cityMap = await aviasalesApi.requestDetails({ iata });
  return {
    props: {
      districts,
      cityMap
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const places = await aviasalesApi.requestPlaces();
  const cities = places.map(({ iata }) => `/${iata}`);
  return {
    paths: cities,
    fallback: true
  };
};
