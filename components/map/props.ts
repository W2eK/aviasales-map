import { DistrictsPointsGeojson, PoiGeojson, VoronoiGeojson } from 'interfaces/city.interface';
import { DistrictsPolygonsGeojson } from 'interfaces/districts.interface';

export interface DistrictsProps {
  data: DistrictsPolygonsGeojson;
}

export interface PoiProps {
  data: PoiGeojson;
}

export interface VoronoiProps {
  data: VoronoiGeojson;
}
