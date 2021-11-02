import axios from 'axios';
import { CityMapWrapper } from 'interfaces/citymap.interface';
import { DistrictsGeoJSON } from 'interfaces/districts.interface';
import { WidgetPlaces } from 'interfaces/places.interface';
import { shapePlaces } from './shapers/shape-places';

type RequestParams = {
  iata: string;
  locale?: string;
};

class AviasalesApi {
  private monetizationClient = axios.create({
    baseURL: 'https://monetization-trap-api.aviasales.ru/api/v1/trap/'
  });

  private widgetClient = axios.create({
    baseURL: 'https://content-admin.aviasales.ru/api/widgets'
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

  async requestDetails({ iata, locale = 'ru_RU' }: RequestParams) {
    const url = `${iata.toUpperCase()}.json`;
    const params = { locale };
    const { data } = await this.monetizationClient.get<CityMapWrapper>(url, {
      params
    });
    return data.city_map;
  }

  async requestDistricts({ iata, locale = 'ru_RU' }: RequestParams) {
    const url = `${iata.toUpperCase()}/polygons_geo_json.json`;
    const params = { locale };
    const { data } = await this.monetizationClient.get<DistrictsGeoJSON>(url, {
      params
    });
    return data;
  }
}

export const aviasalesApi = new AviasalesApi();
