import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { Place } from 'interfaces/places.interface';

const Home: NextPage<HomePageProps> = ({ places }) => {
  return (
    <div>
      <Head>
        <title>Короче о городах</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <pre>{JSON.stringify(places, null, 2)}</pre>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const places = await aviasalesApi.requestPlaces();
  return {
    props: { places }
  };
};

interface HomePageProps {
  places: Place[];
}
