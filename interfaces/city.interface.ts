import { LngLatBoundsLike } from 'mapbox-gl';
import { HomePageProps } from 'pages';
import { Camera, Category, Poi } from './data.interface';
import {
  DistrictsGeojson,
  LabelsGeojson,
  PoiGeojson,
  VoronoiGeojson
} from './geodata.interface';
import { PoiProps } from './poi.interface';

export type PageProps = HomePageProps | MainPageProps;
export type MainPageProps = CityPageProps | CategoryPageProps | PoiPageProps;

export type CommonProps = {
  poi: Record<number, Poi>;
  categories: Category[];
  geojson: Geodata;
};

export type Geodata = {
  poi: PoiGeojson;
  voronoi: VoronoiGeojson;
  labels: LabelsGeojson;
  districts: DistrictsGeojson;
};

export type CityPageProps = CommonProps & {
  page: 'city';
  title: string; // Короче...
  camera: Camera; // From Override
  bounds: LngLatBoundsLike;
};

export type CategoryPageProps = CommonProps & {
  page: 'category';
  currentCategory: Category | null;
  title: string | null;
  subtitle: string | null;
  bounds: LngLatBoundsLike;
  order: number[];
};

export type PoiPageProps = CommonProps & {
  page: 'poi';
  currentCategory: Category | null;
  currentPoi: PoiProps;
  title: string;
  camera: Camera; // Zoom to poi
  order: number[];
};
