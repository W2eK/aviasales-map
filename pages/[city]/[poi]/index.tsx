import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { CityPageProps, getStaticProps as getCityStaticProps } from '..';
import { aviasalesApi } from 'services/aviasales-api';
import { PoiProps } from 'interfaces/poi.interface';
import { PoiLayout } from 'layouts/poi';

export type PoiPageProps = Omit<CityPageProps, 'page'> &
  PoiProps & { id: number; page: 'poi' };

const PoiPage: NextPage<PoiPageProps> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {title ? <PoiLayout /> : null}
    </>
  );
};

export default PoiPage;

export const getStaticProps: GetStaticProps<PoiPageProps> = async ctx => {
  const { params } = ctx;
  if (
    !params ||
    !params.poi ||
    Array.isArray(params.city) ||
    isNaN(+params.poi)
  )
    return { notFound: true };
  const staticCityProps = await getCityStaticProps(ctx);
  if ('props' in staticCityProps) {
    const { props: cityProps } = staticCityProps;
    const id = +params.poi;
    const poiProps = await aviasalesApi.requestPoi({ id });
    const camera = cityProps.poi[id].camera;
    camera.zoom = 16;
    camera.pitch = 60;
    return {
      props: { ...cityProps, ...poiProps, camera, id, page: 'poi' }
    };
  } else {
    return staticCityProps;
  }
};

export const getStaticPaths: GetStaticPaths = ctx => {
  // ctx.params;
  // await new Promise(() => {});
  return {
    paths: [{ params: { city: 'ams', poi: '924' } }],
    fallback: true
  };
};
