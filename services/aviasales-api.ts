import { featureCollection, truncate } from '@turf/turf';
import { DistrictsGeojson, VoronoiGeojson } from 'interfaces/geodata.interface';
import { WidgetPlaces } from 'interfaces/places.interface';
import {
  BlocksRoot,
  DistrictRootBlock as DistrictRoot
} from 'interfaces/poi.interface';
import { shapeCity } from './shapers/shape-city';
import { shapePlaces } from './shapers/shape-places';
import { shapePoi } from './shapers/shape-poi';
import { CityMap } from './interfaces/citymap.interface';
import { computePointOrder } from './shapers/utils/salesman';
import { overrides } from 'data/overrides';
import {
  CityPageProps,
  CategoryPageProps,
  PoiPageProps
} from 'interfaces/props.interface';
import { computeBbox } from './shapers/utils/bbox';
import { IATA } from 'interfaces/iata.interface';
import { CategoryType, PoiType } from 'interfaces/data.interface';
import { monetizationClient, widgetClient } from './axios';
import { buildVoronoi } from './shapers/utils/voronoi';
import { shapeDistrict } from './shapers/shape-district';

type RequestParams = {
  iata: IATA;
  locale?: string;
};

type RequestProps = {
  iata: IATA;
  category: CategoryType;
  poi: number;
};

class AviasalesApi {
  private monetizationClient = monetizationClient;
  private widgetClient = widgetClient;

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

  async requestPoi({
    id,
    locale = 'ru_RU',
    type
  }: {
    id: number;
    locale?: string;
    type: 'districts' | 'poi';
  }) {
    // https://monetization-trap-api.aviasales.ru/api/v1/trap/poi/105.json?locale=ru_RU
    const url = `${type}/${id}.json`;
    const params = { locale };
    const { data } = await this.monetizationClient.get<
      BlocksRoot | DistrictRoot
    >(url, {
      params
    });
    if ('district' in data) {
      return shapeDistrict(data);
    } else {
      return shapePoi(data);
    }
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

  async requestPageProps(
    props: Pick<RequestProps, 'iata'>
  ): Promise<CityPageProps>;
  async requestPageProps(
    props: Pick<RequestProps, 'iata' | 'category'>
  ): Promise<CategoryPageProps>;
  async requestPageProps(props: RequestProps): Promise<PoiPageProps>;
  async requestPageProps(
    props: Pick<RequestProps, 'iata'> & Partial<Omit<RequestProps, 'iata'>>
  ): Promise<CityPageProps | CategoryPageProps | PoiPageProps> {
    let { iata, category, poi } = props;
    iata = iata.toUpperCase() as IATA;
    const page =
      poi !== undefined ? 'poi' : category !== undefined ? 'category' : 'city';
    const districts = await this.requestPolygons({ iata });
    const raw = await this.requestCity({ iata });
    const city = shapeCity(raw);
    const geojson = { ...city.geojson, districts };

    const zoom = raw.city_map.start_zoom;
    const { id, ...restOverrides } = overrides[iata] || {};
    const center = (
      city.geojson.labels.features.find(
        ({ properties }) => properties.id === id
      ) || city.geojson.labels.features[0]
    ).geometry.coordinates as [number, number];
    const camera = { center, zoom, pitch: 50, bearing: 0, ...restOverrides };

    if (page === 'city') {
      const title = raw.city_map.title;

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

      geojson.voronoi =
        category === 'districts'
          ? featureCollection([])
          : buildVoronoi(collection);

      if (page === 'category') {
        const title = currentCategory
          ? currentCategory.title
          : raw.city_map.title;
        const subtitle = currentCategory && currentCategory.subtitle;
        const bounds = computeBbox(
          category === 'districts' ? districts : collection
        );
        camera.bearing =
          camera.bearing > 0 ? camera.bearing + 10 : camera.bearing - 10;
        return {
          page: 'category',
          ...city,
          geojson,
          currentCategory: currentCategory?.type || 'all',
          title,
          subtitle,
          order,
          bounds,
          camera
        };
      } else {
        const type = category === 'districts' ? 'districts' : 'poi';
        const currentPoi = await this.requestPoi({ id: poi!, type });
        const title = currentPoi.title;
        const camera = city.poi[poi!].camera;
        return {
          page: 'poi',
          ...city,
          geojson,
          currentPoi: poi!,
          currentCategory: currentCategory?.type || 'all',
          title,
          description: currentPoi.description,
          camera,
          order
        };
      }
    }
  }
}

export const aviasalesApi = new AviasalesApi();
