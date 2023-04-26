import {
  delegateApi,
  type DelegateApiConstructor,
  type DelegateApiExecuteKeys,
} from '@/services/utils/delegate-api';

export type UseDelegateApiReturn = {
  /**
   * 取消所有使用 `delegateApi` 執行的API
   */
  cancelAll(): void;

  /**
   * 代理執行API
   */
  delegateApi: typeof delegateApi;
};

/**
 * 代理執行API
 *
 * `onBeforeUnmount` 自動取消仍在執行中的 Request
 *
 * @returns
 */
export function useDelegateApi(): UseDelegateApiReturn {
  const cancel$ = ref(0);

  /**
   * 取消所有透過 `proxyDelegateApi` 執行的 API

   * ----
   * 透過異動 `cancel$` 來觸發 `proxyDelegateApi` 中 Watcher
   */
  function cancelAll() {
    cancel$.value++;
  }

  /**
   * 代理執行 API
   *
   * ----
   * 監聽 `cancel$` 變化來取消所執行的 API
   *
   * @param args
   * @returns
   */
  function proxyDelegateApi<
    T extends DelegateApiConstructor,
    M extends DelegateApiExecuteKeys<InstanceType<T>>
  >(...args: Parameters<typeof delegateApi<T, M>>) {
    const proxyFn = delegateApi<T, M>(...args);

    // Watch `cancel$` to cancel request
    watch(
      cancel$,
      () => {
        proxyFn.cancel();
      },
      { flush: 'sync' }
    );

    return proxyFn;
  }

  onBeforeUnmount(() => {
    cancelAll();
  });

  return {
    cancelAll,
    delegateApi: proxyDelegateApi,
  };
}
