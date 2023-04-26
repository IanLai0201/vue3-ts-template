import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import { StorageKey } from '@/enums/storage-key';

/**
 * Auth store
 */
export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const accessToken = useLocalStorage(StorageKey.AccessToken, '');
  const refreshToken = useLocalStorage(StorageKey.RefreshToken, '');

  return {
    isLoggedIn: readonly(isLoggedIn),
    accessToken: readonly(accessToken),
    refreshToken: readonly(refreshToken),
  };
});
