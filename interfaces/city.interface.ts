import { LngLatBoundsLike } from 'mapbox-gl';
import { Camera, Category, Poi } from './data.interface';
import {
  DistrictsGeojson,
  LabelsGeojson,
  PoiGeojson,
  VoronoiGeojson
} from './geodata.interface';
import { PoiProps } from './poi.interface';

export type CityPageProps = AllPage & (CityPage | CategoryPage | PoiPage);

export type AllPage = {
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

export type CityPage = {
  page: 'city';
  title: string; // Короче...
  camera: Camera; // From Override
  bounds: LngLatBoundsLike;
};

export type CategoryPage = {
  page: 'category';
  currentCategory: Category | null;
  title: string | null;
  subtitle: string | null;
  bounds: LngLatBoundsLike;
  order: number[];
};

export type PoiPage = {
  page: 'poi';
  currentCategory: Category | null;
  currentPoi: PoiProps;
  title: string;
  camera: Camera; // Zoom to poi
  order: number[];
};
