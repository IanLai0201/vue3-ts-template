import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { AuthSessionError } from '@/instances/auth-session-error';

import type { BaseApi } from '../api/_abstract/base-api';
import defaultInstance from '../instances/default-instance';
import type { DoApiDelete } from '../interfaces/do-api-delete';
import type { DoApiGet } from '../interfaces/do-api-get';
import type { DoApiGetBy } from '../interfaces/do-api-get-by';
import type { DoApiPatch } from '../interfaces/do-api-patch';
import type { DoApiPost } from '../interfaces/do-api-post';
import type { DoApiPut } from '../interfaces/do-api-put';

export type DelegateApiOptions = {
  /**
   * 指定 Axios instance, 預設 /services/instances/default-instance
   */
  instance?: AxiosInstance;

  /**
   * 固定 Request config
   */
  requestConfig?: AxiosRequestConfig;
};

export type DelegateApiConstructor<T = any> = new (
  ...args: ConstructorParameters<typeof BaseApi>
) => T;

export type DelegateApiExecuteType<T = any, D = any> = (
  ...args: any[]
) => Promise<AxiosResponse<T, D>>;

export type DelegateApiExecuteKeys<T> = {
  [K in keyof T]: T[K] extends DelegateApiExecuteType ? K : never;
}[keyof T];

export type DelegateApiReturn<T extends DelegateApiExecuteType> = {
  /**
   * 取消當前的 Request
   */
  cancel(): void;

  /**
   * 手動呼叫 Request
   */
  execute: T;
};

/**
 * Type guard - DoApiGet
 *
 * @param api
 * @returns
 */
function isDoApiGet(api: DoApiGet | any): api is DoApiGet {
  return 'get' in api;
}

/**
 * Type guard - DoApiGetBy
 *
 * @param api
 * @returns
 */
function isDoApiGetBy(api: DoApiGetBy | any): api is DoApiGetBy {
  return 'getBy' in api;
}

/**
 * Type guard - DoApiPost
 *
 * @param api
 * @returns
 */
function isDoApiPost(api: DoApiPost | any): api is DoApiPost {
  return 'post' in api;
}

/**
 * Type guard - DoApiPatch
 *
 * @param api
 * @returns
 */
function isDoApiPatch(api: DoApiPatch | any): api is DoApiPatch {
  return 'patch' in api;
}

/**
 * DoApiPut
 *
 * @param api
 * @returns
 */
function isDoApiPut(api: DoApiPut | any): api is DoApiPut {
  return 'put' in api;
}

/**
 * DoApiDelete
 *
 * @param api
 * @returns
 */
function isDoApiDelete(api: DoApiDelete | any): api is DoApiDelete {
  return 'delete' in api;
}

/**
 * 代理執行API
 *
 * API： `DoApiGet`, `DoApiGetBy`, `DoApiPost`, `DoApiPatch`, `DoApiPut`, `DoApiDelete`
 *
 * @param ctor API 建構子
 * @param method 執行 method
 * @param options
 * @returns
 */
export function delegateApi<
  T extends DelegateApiConstructor,
  M extends DelegateApiExecuteKeys<InstanceType<T>>
>(ctor: T, method: M, options: DelegateApiOptions = {}): DelegateApiReturn<InstanceType<T>[M]> {
  const api = new ctor(options.instance || defaultInstance);
  const fn = api[method].bind(api) as DelegateApiExecuteType;

  let control = new AbortController();

  /**
   * 重新設定 API Request 參數
   *
   * @param args
   * @returns
   */
  function prepareArgs(...args: any[]) {
    const config: AxiosRequestConfig = {
      ...options.requestConfig,
      signal: control.signal,
    };

    // reset request config parameter
    // two parameters instance
    if (isDoApiGet(api) || isDoApiGetBy(api) || isDoApiPost(api) || isDoApiDelete(api)) {
      const getArgs = [...args] as
        | Parameters<DoApiGet['get']>
        | Parameters<DoApiGetBy['getBy']>
        | Parameters<DoApiPost['post']>
        | Parameters<DoApiDelete['delete']>;

      // reset config
      getArgs[1] = {
        ...getArgs[1],
        ...config,
      };

      args = [...getArgs];
    }

    // three parameters instance
    else if (isDoApiPatch(api) || isDoApiPut(api)) {
      const getArgs = [...args] as Parameters<DoApiPatch['patch']> | Parameters<DoApiPut['put']>;

      // reset config
      getArgs[2] = {
        ...getArgs[2],
        ...config,
      };

      args = [...getArgs];
    }

    // invalid api
    else {
      throw TypeError(`Can't not find api method. Get method: ${String(method)}`);
    }

    return args;
  }

  /**
   * 取消 Request
   */
  function cancel() {
    control.abort();
    control = new AbortController();
  }

  /**
   * 執行 Request
   *
   * @param args
   * @returns
   */
  async function execute(...args: any[]) {
    console.log(`Delegate API: ${ctor.name}, method: ${String(method)}`);

    try {
      // abort last request before current request
      cancel();

      const _args = prepareArgs(args);

      return await fn(..._args);
    } catch (e) {
      console.error(e);

      if (e instanceof AuthSessionError) {
        // TODO 登出
      }

      throw e;
    }
  }

  return {
    cancel,
    execute,
  };
}
