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
import cameraOptions from 'data/camera.json';

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
  const poi: (Poi | District)[] = [];
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
        poi.push({ type, id, name, image_url, description });
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
  const center = labelsGeojson.features[0].geometry.coordinates as [
    number,
    number
  ];
  const pitch = 50;
  const overrides =
    iata in cameraOptions
      ? cameraOptions[iata as keyof typeof cameraOptions]
      : {};
  const camera = { center, zoom, pitch, bearing: 0, ...overrides };

  return {
    title,
    camera,
    poi,
    categories,
    poiGeojson,
    voronoiGeojson,
    labelsGeojson
  };
};
