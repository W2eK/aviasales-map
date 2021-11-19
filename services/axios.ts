import axios from 'axios';
import { cache } from './cache';

export const widgetClient = axios.create({
  baseURL: 'https://content-admin.aviasales.ru/api/widgets'
  // headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
});

export const monetizationClient = axios.create({
  baseURL: 'https://monetization-trap-api.aviasales.ru/api/v1/trap/'
  // headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }
});

monetizationClient.interceptors.request.use(
  request => {
    if (request.method === 'get') {
      const params = Object.entries(request.params)
        .map(pair => pair.join('='))
        .join('&');
      const uri = `${request.url}?${params}`;
      const cached = cache.get(uri);
      if (cached) {
        console.log(`"${uri}" served from cache`);
        request.data = cached;
        // @ts-ignore
        request.adapter = () => {
          return Promise.resolve({
            data: cached,
            status: 200,
            statusText: 'ok',
            headers: request.headers,
            config: request,
            request: request
          });
        };
      }
    }
    return request;
  },
  error => Promise.reject(error)
);

monetizationClient.interceptors.response.use(
  response => {
    const params = Object.entries(response.config.params)
      .map(pair => pair.join('='))
      .join('&');
    const uri = `${response.config.url}?${params}`;
    cache.set(uri, response.data);
    return response;
  },
  error => Promise.reject(error)
);

/*
monetizationClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    config.data = 0
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

monetizationClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
*/
