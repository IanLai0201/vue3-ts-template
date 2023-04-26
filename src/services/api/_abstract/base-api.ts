import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import urlJoin from 'url-join';

/**
 * Base API
 *
 * 所有 API 需繼承之, 統一由此 class 呼叫 Axios instance
 *
 * @export
 * @abstract
 * @class BaseApi
 */
export abstract class BaseApi {
  constructor(protected instance: AxiosInstance) {}

  protected execGet<R>(
    config?: AxiosRequestConfig<undefined>
  ): Promise<AxiosResponse<R, undefined>> {
    return this.request<R, undefined>({
      ...config,
      method: 'GET',
    });
  }

  protected execPost<R, D = any>(config?: AxiosRequestConfig<D>) {
    return this.request<R, D>({
      ...config,
      method: 'POST',
    });
  }

  protected execPatch<R, D = any>(config?: AxiosRequestConfig<D>) {
    return this.request<R, D>({
      ...config,
      method: 'PATCH',
    });
  }

  protected execPut<R, D = any>(config?: AxiosRequestConfig<D>) {
    return this.request<R, D>({
      ...config,
      method: 'PUT',
    });
  }

  protected execDelete<R>(config?: AxiosRequestConfig<undefined>) {
    return this.request<R, undefined>({
      ...config,
      method: 'DELETE',
    });
  }

  protected async request<R, D>(config: AxiosRequestConfig<D>) {
    try {
      return await this.instance.request<R, AxiosResponse<R, D>, D>(config);
    } catch (e) {
      console.error(e);

      throw e;
    }
  }

  protected getUrl(...parts: string[]) {
    return urlJoin(parts);
  }
}
