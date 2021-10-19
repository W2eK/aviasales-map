import type { NextPage } from 'next';
import Head from 'next/head';
import { MapContainer } from '../components/map';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Короче о городах</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MapContainer />
    </div>
  );
};

export default Home;
