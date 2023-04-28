import type { AxiosRequestConfig } from 'axios';

import type { DoApiGet } from '../interfaces/do-api-get';
import type { DoApiGetBy } from '../interfaces/do-api-get-by';

import { BaseApi } from './_abstract/base-api';

type ExampleGetReturnType = {
  message: string;
  status: string;
};

const URL = 'https://dog.ceo/api/breeds/image/random';

export class ApiExample extends BaseApi implements DoApiGetBy, DoApiGet {
  getBy(key: string | number, config?: AxiosRequestConfig<undefined>) {
    return super.execGet<{ message: 'string' }>({
      url: this.getUrl(URL, String(key)),
      ...config,
    });
  }

  get(params?: Record<string, any>, config?: AxiosRequestConfig<undefined>) {
    return super.execGet<ExampleGetReturnType>({
      url: this.getUrl(URL),
      params,
      ...config,
    });
  }
}
