import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API put
 */
export interface DoApiPut<T = any, D = any> {
  put(key: string | number, data?: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>>;
}
