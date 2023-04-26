import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API patch
 */
export interface DoApiPatch<T = any, D = any> {
  patch(
    key: string | number,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<T, D>>;
}
