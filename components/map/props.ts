import { DistrictsPointsGeojson, PoiGeojson, VoronoiGeojson } from 'interfaces/city.interface';
import { DistrictsPolygonsGeojson } from 'interfaces/districts.interface';
import { HomePageProps } from 'pages';
import { CityPageProps } from 'pages/[city]';

export type MapContainerProps = HomePageProps | CityPageProps;

export interface DistrictsProps {
  data: DistrictsPolygonsGeojson;
}

export interface PoiProps {
  data: PoiGeojson;
}

export interface VoronoiProps {
  data: VoronoiGeojson;
}
