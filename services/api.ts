import fetch from 'isomorphic-fetch';

import { BASE_URL } from '../constants';

type ConfigType = {
  method?: string,
  data?: any
};

const api = {
  callJSON: async (url: string, { method = 'GET', data }: ConfigType = {}) => {
    const URL = `${BASE_URL}/${url}`;
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    return fetch(URL, config).then((response) => response.json());
  },
  callJSONWithAuth: async (url: string, data: Record<string, any>, method = 'GET') => {
    const URL = `${BASE_URL}/${url}`;
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Berrear': 'token-cookie'
      },
      body: JSON.stringify(data)
    };

    return fetch(URL, config).then((response) => response.json());
  }
};

export default api;