import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { aviasalesApi } from 'services/aviasales-api';
import { PoiType, poiTypes } from 'interfaces/data.interface';
import { CityLayout } from 'layouts/city';
import { CityPageProps } from 'interfaces/city.interface';
import { IATA, iataCodes } from 'interfaces/iata.interface';

type CityParams = {
  city: IATA;
};

type CategoryParams = CityParams & {
  category: 'all' | PoiType;
};

type PoiParams = CategoryParams & {
  poi: string;
};

export type CityPageParams = CityParams | CategoryParams | PoiParams;

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
  const {
    city: iata,
    category,
    poi: strPoi
  }: {
    city: IATA;
    category?: 'all' | PoiType;
    poi?: string;
  } = params as CityPageParams;

  console.log(params);
  if (
    !iataCodes.includes(iata.toUpperCase() as IATA) ||
    (category !== undefined &&
      category !== 'all' &&
      !poiTypes.includes(category)) ||
    (strPoi && isNaN(+strPoi))
  )
    return { notFound: true };

  try {
    const poi = strPoi === undefined ? undefined : +strPoi;
    const props = await aviasalesApi.requestPageProps({ iata, category, poi });
    return { props };
  } catch (err) {
    console.warn(err);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const places = await aviasalesApi.requestPlaces();
  const cities = places.map(({ iata }) => `/${iata.toLocaleLowerCase()}`);
  // .slice(0, 5);
  return {
    paths: cities,
    fallback: true
  };
};
