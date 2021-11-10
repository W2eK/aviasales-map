import {
  Category,
  City,
  CityWrapper,
  District,
  LabelsGeojson,
  IATA,
  Poi,
  PoiGeojson,
  VoronoiGeojson
} from 'interfaces/city.interface';
import * as turf from '@turf/turf';
import { overrides } from 'data/overrides';
import { computePointOrder } from './utils/salesman';

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
  const categories: Category[] = [];
  let poi: Poi[] = [];
  const districts: District[] = [];
  const poiGeojson: PoiGeojson = turf.featureCollection([]);
  const labelsGeojson: LabelsGeojson = turf.featureCollection([]);
  tabs.forEach(tab => {
    const { id, title, subtitle, type } = tab;
    categories.push({ id, title, subtitle, type });
    tab.pins.forEach(({ id, name, image_url, description, coordinates }) => {
      const { longitude, latitude } = coordinates;
      if (type !== 'districts') {
        poi.push({ type, id, name, image_url });
        poiGeojson.features.push(
          turf.point([longitude, latitude], { id, type })
        );
      } else {
        districts.push({ type, id, name, image_url, description });
        labelsGeojson.features.push(
          turf.point([longitude, latitude], {
            id,
            name,
            type,
            description: trimDescription(description)
          })
        );
      }
    });
  });
  poi = computePointOrder(poiGeojson).map(
    id => poi.find(poi => poi.id === id)!
  );
  // Voronoi
  const voronoiGeojson = turf.voronoi(poiGeojson, {
    bbox: turf.bbox(turf.buffer(turf.bboxPolygon(turf.bbox(poiGeojson)), 1))
  }) as any as VoronoiGeojson;
  voronoiGeojson.features.forEach((feature, i) => {
    feature.properties = poiGeojson.features[i].properties;
  });

  // ! BUG: deal with multiple POI with same coordinates
  voronoiGeojson.features = voronoiGeojson.features.filter(feature => feature);
  // Camera Options
  // const { longitude, latitude } = city_map.start_point;
  const { id, ...restOverrides } = overrides[iata] || {};

  const center = (
    labelsGeojson.features.find(({ properties }) => properties.id === id) ||
    labelsGeojson.features[0]
  ).geometry.coordinates as [number, number];
  const pitch = 50;
  const camera = { center, zoom, pitch, bearing: 0, ...restOverrides };

  return {
    id: id || labelsGeojson.features[0].properties.id,
    title,
    camera,
    poi,
    districts,
    categories,
    poiGeojson,
    voronoiGeojson,
    labelsGeojson
  };
};
