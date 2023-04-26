import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API post
 */
export interface DoApiPost<T = any, D = any> {
  post(data?: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>>;
}
