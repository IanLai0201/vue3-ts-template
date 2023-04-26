import { noop } from '@vueuse/core';
import { isCancel } from 'axios';

import type { DelegateApiConstructor, DelegateApiExecuteKeys } from '@/services/utils/delegate-api';

import { useDelegateApi } from './use-delegate-api';

export type DelegateApiResponse<
  T extends DelegateApiConstructor,
  M extends DelegateApiExecuteKeys<InstanceType<T>>
> = Awaited<ReturnType<InstanceType<T>[M]>>;

export type UseInvokeApiOptions<T = any> = {
  /**
   * Data 預設值
   */
  initialData?: T;

  /**
   * Error 觸發
   *
   * @param e
   * @returns
   */
  onError?: (e: unknown) => void;

  /**
   * Success 觸發
   *
   * @param data
   * @returns
   */
  onSuccess?: (data: T) => void;

  /**
   * Request 結束觸發( finally )
   *
   * @returns
   */
  onFinish?: () => void;
};

/**
 * 封裝API，Response, data, error 封裝成 Ref 物件，
 * 成功、錯誤等處理需透過 options 傳入 callback，採非同步方式執行，
 * 透過 execute 手動觸發
 *
 * @param ctor API 建構子
 * @param method 執行 method
 * @param options
 * @returns
 */
export function useInvokeApi<
  T extends DelegateApiConstructor,
  M extends DelegateApiExecuteKeys<InstanceType<T>>
>(ctor: T, method: M, options: UseInvokeApiOptions<DelegateApiResponse<T, M>['data']> = {}) {
  const { delegateApi } = useDelegateApi();
  const { cancel: cancelApi, execute: execAPi } = delegateApi<T, M>(ctor, method);

  const { initialData, onSuccess = noop, onError = noop, onFinish = noop } = options;

  const response = shallowRef<DelegateApiResponse<T, M> | undefined>();
  const data = shallowRef<DelegateApiResponse<T, M>['data'] | undefined>(initialData);
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isCanceled = ref(false);
  const error = shallowRef<unknown>();

  function loading(loading: boolean) {
    isLoading.value = loading;
    isFinished.value = !loading;
  }

  function cancel() {
    if (isFinished.value || !isLoading.value) {
      return;
    }

    cancelApi();

    isLoading.value = false;
    isFinished.value = false;
  }

  function execute(...args: Parameters<InstanceType<T>[M]>) {
    error.value = undefined;

    cancel();
    loading(true);

    (execAPi(...args) as Promise<DelegateApiResponse<T, M>>)
      .then((r) => {
        response.value = r;

        const result = r['data'];
        data.value = result;

        onSuccess(result);
      })
      .catch((e: any) => {
        error.value = e;

        if (isCancel(e)) {
          isCanceled.value = true;
        }

        onError(e);
      })
      .finally(() => {
        onFinish();
        loading(false);
      });
  }

  return {
    response: readonly(response),
    data: readonly(data),
    isLoading: readonly(isLoading),
    cancel,
    isCanceled: readonly(isCanceled),
    error: readonly(error),
    execute,
  };
}
