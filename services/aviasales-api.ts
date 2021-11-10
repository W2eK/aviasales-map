import axios from 'axios';
import { CityWrapper, IATA } from 'interfaces/city.interface';
import { DistrictsGeojson } from 'interfaces/districts.interface';
import { WidgetPlaces } from 'interfaces/places.interface';
import { shapeCity } from './shapers/shape-city';
import { shapeDistricts } from './shapers/shape-districts';
import { shapePlaces } from './shapers/shape-places';

type RequestParams = {
  iata: IATA;
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

  async requestCity({ iata, locale = 'ru_RU' }: RequestParams) {
    iata = iata.toUpperCase() as IATA;
    const url = `${iata}.json`;
    const params = { locale };
    const { data } = await this.monetizationClient.get<CityWrapper>(url, {
      params
    });
    return shapeCity(data, iata);
  }

  async requestPolygons({ iata, locale = 'ru_RU' }: RequestParams) {
    const url = `${iata.toUpperCase()}/polygons_geo_json.json`;
    const params = { locale };
    const { data } = await this.monetizationClient.get<DistrictsGeojson>(url, {
      params
    });
    return data;
    // return shapeDistricts(data);
  }
}

export const aviasalesApi = new AviasalesApi();
