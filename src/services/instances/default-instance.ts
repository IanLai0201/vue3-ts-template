import Axios, { AxiosError, HttpStatusCode, isAxiosError } from 'axios';
import { stringify } from 'qs';

import { AuthSessionError } from '@/instances/auth-session-error';

/**
 * 是否正在執行 Refresh tokens
 */
let isRefreshing = false;

/**
 * Refreshing 中待執行 callbacks
 */
let subscribers: (() => void)[] = [];

/**
 * Http code 401 error 處理
 *
 * ----
 * #### throws Error
 * - reject `AuthSessionError` error
 *
 * @param error
 * @returns
 */
async function handleError401(error: AxiosError) {
  const config = error.config!;

  if (!isRefreshing) {
    isRefreshing = true;

    refreshTokens()
      .then(() => {
        // refresh end, trigger pending requests
        subscribers.forEach((cb) => cb());
      })
      .catch((e) => {
        console.error(e);

        if (e instanceof AuthSessionError) {
          // TODO 登出
        }
      })
      .finally(() => {
        isRefreshing = false;
        subscribers = [];
      });
  }

  return new Promise((resolve) => {
    subscribers.push(() => {
      resolve(instance(config));
    });
  });
}

/**
 * Refresh tokens function
 *
 * @returns
 */
async function refreshTokens() {
  try {
    return await Promise.resolve();
  } catch (e) {
    throw new AuthSessionError(e);
  }
}

/**
 * Axios instance
 *
 * 1. Request header 夾帶 token
 * 2. HttpCode 401 error, 實作 Refresh tokens
 * 3. Refresh 發生錯誤時, 自動登出
 */
const instance = Axios.create({
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
});

instance.interceptors.request.use(
  (request) => {
    // TODO Add Authorization header
    return { ...request };
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          return handleError401(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
