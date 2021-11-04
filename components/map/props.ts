import { DistrictsGeoJSON } from 'interfaces/districts.interface';
import { HomePageProps } from 'pages';
import { CityPageProps } from 'pages/[city]';

export type MapContainerProps = HomePageProps | CityPageProps;

export interface DistrictsProps {
  data: DistrictsGeoJSON | null;
}
