import { defineStore } from 'pinia';

/**
 * Loader Store
 *
 * ---
 * 依照開啟次數，執行相對應的關閉次數才關閉 loading
 *
 */
export const useLoaderStore = defineStore('loader', () => {
  const loading = ref(false);

  let execCounter = 0;

  /**
   * 開啟 loading，開啟次數 `+1`
   */
  function start() {
    if (execCounter === 0) {
      loading.value = true;
    }

    execCounter++;
  }

  /**
   * 開啟次數 `-1`, 當開啟次數歸零才關閉 loading
   */
  function stop() {
    if (execCounter > 0) {
      execCounter--;
    }

    if (execCounter <= 0) {
      loading.value = false;
    }
  }

  return { loading: readonly(loading), start, stop };
});
