import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API delete
 */
export interface DoApiDelete<T = any, D = any> {
  delete(
    key: string | number,
    config?: AxiosRequestConfig<undefined>
  ): Promise<AxiosResponse<T, D>>;
}
