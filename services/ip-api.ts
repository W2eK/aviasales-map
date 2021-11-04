import axios from 'axios';
import { IpApiResponse } from 'interfaces/ip.interface';

class IpApi {
  client = axios.create({ baseURL: 'http://ip-api.com/json' });
  async getLocation() {
    const { data } = await this.client.get<IpApiResponse>('/');
    return data;
  }
}

export const ipApi = new IpApi();
