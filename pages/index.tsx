import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { Place } from 'interfaces/places.interface';
import { PlacesList } from 'components/places/list';


export interface HomePageProps {
  page: 'index';
  places: Place[];
}

const Home: NextPage<HomePageProps> = ({ places }) => {
  return (
    <>
      <Head>
        <title>Короче о городах</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlacesList places={places} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const places = await aviasalesApi.requestPlaces();
  return {
    props: { page: 'index', places }
  };
};
