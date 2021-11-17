import {
  Category,
  Poi,
} from 'interfaces/data.interface';
import * as turf from '@turf/turf';
import { buildVoronoi } from './utils/voronoi';
import { CityMap } from 'services/interfaces/citymap.interface';
import { AllPage, Geodata } from 'interfaces/city.interface';
import { LabelsGeojson, PoiGeojson, VoronoiGeojson } from 'interfaces/geodata.interface';

const trimDescription = (description: string) => {
  const words = description.split(/(?<=[\wа-я]{3}) /);
  let text = '';
  while (words.length) {
    const word = words.shift()!;
    if (text.length + word.length < 35) {
      text += ` ${word}`;
    } else {
      text += '...';
      break;
    }
  }
  return text.trim();
};

export type ShapedCity = Omit<AllPage, 'geojson'> & {
  geojson: Omit<Geodata, 'districts'>;
};

export const shapeCity = ({ city_map }: CityMap): ShapedCity => {
  const { start_zoom, title, tabs } = city_map;
  const poi: Record<number, Poi> = {};
  const categories: Category[] = [];
  const poiGeojson: PoiGeojson = turf.featureCollection([]);
  const labelsGeojson: LabelsGeojson = turf.featureCollection([]);
  tabs.forEach(tab => {
    const { id, title, subtitle, type } = tab;
    categories.push({ id, title, subtitle, type });
    tab.pins.forEach(({ id, name, image_url, description, coordinates }) => {
      const { longitude, latitude } = coordinates;
      const center: [number, number] = [longitude, latitude];
      const bearing = 180 - Math.random() * 360;
      const camera = { center, bearing };
      poi[id] = { type, id, name, image_url, camera, description };
      if (type !== 'districts') {
        poiGeojson.features.push(turf.point(center, { id, type }));
      } else {
        description = trimDescription(description);
        labelsGeojson.features.push(
          turf.point(center, { id, name, type, description })
        );
      }
    });
  });
  const voronoiGeojson = buildVoronoi(poiGeojson) as VoronoiGeojson;
  return {
    poi,
    categories,
    geojson: {
      voronoi: voronoiGeojson,
      poi: poiGeojson,
      labels: labelsGeojson
    }
  };
};
