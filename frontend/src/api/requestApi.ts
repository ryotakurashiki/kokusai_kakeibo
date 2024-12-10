import axios, { type AxiosResponse } from 'axios';

export async function requestApi<T>(config: {
  url: string;
  method: 'GET' | 'POST' | 'PUT';
  params?: Record<string, unknown>;
  body?: Record<string, unknown> | FormData;
}): Promise<T> {
  try {
    const res: AxiosResponse<T> = await axios({
      url: config.url,
      method: config.method,
      params: config.params,
      data: config.body,
      headers: { 'content-type': 'application/json' },
      responseType: 'json'
    });
    return res.data;
  } catch (e) {
    throw e;
  }
}
