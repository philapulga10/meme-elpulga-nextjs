import fetch from 'isomorphic-fetch';

import { BASE_URL } from '../constants';

type ConfigType = {
  method?: string,
  data?: any,
  token?: string
};

type ConfigFormType = {
  data: FormData,
  token: string,
  method?: string
};

const api = {
  callJson: async (url: string, { method = 'GET', data, token }: ConfigType = {}) => {
    const URL = `${BASE_URL}/${url}`;
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(URL, config).then((response) => response.json());
  },
  callFormData: async (url: string, { method = 'POST', data, token }: ConfigFormType) => {
    const URL = `${BASE_URL}${url}`;
    const config = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    };

    return fetch(URL, config).then((response) => response.json());
  }
};

export default api;
