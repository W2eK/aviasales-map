import axios from 'axios';
import { featureCollection, truncate } from '@turf/turf';
import { DistrictsGeojson } from 'interfaces/geodata.interface';
import { WidgetPlaces } from 'interfaces/places.interface';
import { BlocksRoot } from 'interfaces/poi.interface';
import { shapeCity } from './shapers/shape-city';
import { shapePlaces } from './shapers/shape-places';
import { shapePoi } from './shapers/shape-poi';
import { CityMap } from './interfaces/citymap.interface';
import { computePointOrder } from './shapers/utils/salesman';
import { overrides } from 'data/overrides';
import { CityPageProps } from 'interfaces/city.interface';
import { computeBbox } from './shapers/utils/bbox';
import { IATA } from 'interfaces/iata.interface';
import { PoiType } from 'interfaces/data.interface';

type RequestParams = {
  iata: IATA;
  locale?: string;
};

class AviasalesApi {
  private monetizationClient = axios.create({
    baseURL: 'https://monetization-trap-api.aviasales.ru/api/v1/trap/',
    headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
  });

  private widgetClient = axios.create({
    baseURL: 'https://content-admin.aviasales.ru/api/widgets',
    headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
  });

  async requestPlaces() {
    const headers = {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json;charset=UTF-8'
    };
    const query = `{
      widgets {
        trapV1(locale: "ru-RU", showPremium: false) {
          places {
            name
            country
            iatas
            isPremium
          }
        }
      }
    }`;
    const body = { operation_name: 'fetch_trap', app: 'selene', query };
    const { data } = await this.widgetClient.post<WidgetPlaces>('', body, {
      headers
    });
    return shapePlaces(data);
  }

  async requestPoi({ id, locale = 'ru_RU' }: { id: number; locale?: string }) {
    // https://monetization-trap-api.aviasales.ru/api/v1/trap/poi/105.json?locale=ru_RU
    const url = `poi/${id}.json`;
    const params = { locale };
    const { data } = await this.monetizationClient.get<BlocksRoot>(url, {
      params
    });
    return shapePoi(data);
  }

  async requestCity({ iata, locale = 'ru_RU' }: RequestParams) {
    iata = iata.toUpperCase() as IATA;
    const url = `${iata}.json`;
    const params = { locale };
    const { data } = await this.monetizationClient.get<CityMap>(url, {
      params
    });
    return data;
  }

  async requestPolygons({ iata, locale = 'ru_RU' }: RequestParams) {
    const url = `${iata.toUpperCase()}/polygons_geo_json.json`;
    const params = { locale };
    const { data } = await this.monetizationClient.get<DistrictsGeojson>(url, {
      params
    });
    return truncate(data);
  }

  async requestPageProps({
    iata,
    poi,
    category
  }: {
    iata: IATA;
    poi?: number;
    category?: 'all' | PoiType;
  }): Promise<CityPageProps> {
    const page =
      poi !== undefined ? 'poi' : category !== undefined ? 'category' : 'city';
    const districts = await this.requestPolygons({ iata });
    const raw = await this.requestCity({ iata });
    const city = shapeCity(raw);
    const geojson = { ...city.geojson, districts };

    if (page === 'city') {
      const title = raw.city_map.title;
      const zoom = raw.city_map.start_zoom;
      const { id, ...restOverrides } = overrides[iata] || {};
      const center = (
        city.geojson.labels.features.find(
          ({ properties }) => properties.id === id
        ) || city.geojson.labels.features[0]
      ).geometry.coordinates as [number, number];
      const pitch = 50;
      const camera = { center, zoom, pitch, bearing: 0, ...restOverrides };
      // @ts-ignore
      const features = featureCollection([
        ...geojson.poi.features,
        ...geojson.districts.features
      ]);
      const bounds = computeBbox(features, 5);
      return {
        page: 'city',
        ...city,
        geojson,
        title,
        camera,
        bounds
      };
    } else {
      const features =
        category === 'districts'
          ? city.geojson.labels.features
          : category === 'all'
          ? city.geojson.poi.features
          : city.geojson.poi.features.filter(
              ({ properties }) => properties.type === category
            );
      const collection = featureCollection(features);
      const order = computePointOrder(collection);
      const currentCategory =
        category !== 'all'
          ? city.categories.find(({ type }) => type === category)!
          : null;
      if (page === 'category') {
        const title = currentCategory && currentCategory.title;
        const subtitle = currentCategory && currentCategory.title;
        const bounds = computeBbox(collection);
        return {
          page: 'category',
          ...city,
          geojson,
          currentCategory,
          title,
          subtitle,
          order,
          bounds
        };
      } else {
        const currentPoi = await this.requestPoi({ id: poi! });
        const title = currentPoi.title;
        const camera = city.poi[poi!].camera;
        return {
          page: 'poi',
          ...city,
          geojson,
          currentPoi,
          currentCategory,
          title,
          camera,
          order
        };
      }
    }
  }
}

export const aviasalesApi = new AviasalesApi();
