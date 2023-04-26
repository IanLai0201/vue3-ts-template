import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API get by
 *
 * ----
 * Path parameter 應用
 */
export interface DoApiGetBy<T = any, D = any> {
  getBy(key: string | number, config?: AxiosRequestConfig<undefined>): Promise<AxiosResponse<T, D>>;
}
