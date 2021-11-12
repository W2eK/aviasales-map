import {
  Category,
  City,
  CityWrapper,
  LabelsGeojson,
  IATA,
  Poi,
  PoiGeojson,
  Camera
} from 'interfaces/city.interface';
import * as turf from '@turf/turf';
import { overrides } from 'data/overrides';
import { computePointOrder } from './utils/salesman';
import { buildMultiVoronoi } from './utils/voronoi';

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

export const shapeCity = ({ city_map }: CityWrapper, iata: IATA): City => {
  const { start_zoom: zoom, title, tabs } = city_map;

  // Pins
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
  const order = computePointOrder(
    turf.featureCollection([...poiGeojson.features, ...labelsGeojson.features])
  );
  const voronoiGeojson = buildMultiVoronoi(
    poiGeojson,
    categories.map(({ type }) => type).filter(type => type !== 'districts')
  );

  // Camera Options
  // const { longitude, latitude } = city_map.start_point;
  const { id, ...restOverrides } = overrides[iata] || {};

  const center = (
    labelsGeojson.features.find(({ properties }) => properties.id === id) ||
    labelsGeojson.features[0]
  ).geometry.coordinates as [number, number];
  const pitch = 50;
  const camera = { center, zoom, pitch, bearing: 0, ...restOverrides };
  const districtId = id || labelsGeojson.features[0].properties.id;

  return {
    districtId,
    title,
    camera,
    poi,
    order,
    categories,
    geojson: {
      poi: turf.truncate(poiGeojson),
      voronoi: turf.truncate(voronoiGeojson),
      labels: turf.truncate(labelsGeojson)
    }
  };
};
