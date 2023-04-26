import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API get
 */
export interface DoApiGet<T = any, D = any> {
  get(
    params?: Record<string, any>,
    config?: AxiosRequestConfig<undefined>
  ): Promise<AxiosResponse<T, D>>;
}
