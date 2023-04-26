/**
 * Tokens 過期錯誤
 *
 * @export
 * @class AuthSessionError
 * @extends {Error}
 */
export class AuthSessionError extends Error {
  originError: unknown;

  constructor(error: unknown) {
    super(
      'Both token and refresh token have expired or unexpected error. Your request was aborted.'
    );

    this.name = 'AuthSessionError';
    this.originError = error;
  }
}
