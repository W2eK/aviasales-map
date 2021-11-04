import Head from 'next/head';
import { CityMap } from 'interfaces/citymap.interface';
import { DistrictsGeoJSON } from 'interfaces/districts.interface';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { MapContainer } from 'components/map';
import { useStoreState } from 'store/context';
import { FC } from 'react';

export interface CityPageProps {
  page: 'city';
  districts: DistrictsGeoJSON;
  cityMap: CityMap;
}

const Temp: FC<{ cityMap: CityMap }> = ({ cityMap }) => {
  const { state } = useStoreState();
  return (
    <div>
      <h1>{cityMap?.title}</h1>
      {state.districtHover && <h3>{cityMap.tabs[0].pins.find(({id}) => id === state.districtHover)?.name}</h3>}
    </div>
  );
};
const Temp_: FC = () => {
  return <pre>test</pre>;
};

const CityPage: NextPage<CityPageProps> = ({ districts, cityMap }) => {
  return (
    <>
      <Head>
        <title>{cityMap?.title}</title>
      </Head>
      <Temp cityMap={cityMap} />
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
    console.warn(err);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const places = await aviasalesApi.requestPlaces();
  const cities = places.map(({ iata }) => `/${iata}`).slice(0, 5);
  return {
    paths: cities,
    fallback: true
  };
};
