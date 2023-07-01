import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CookieSerializeOptions, serialize } from 'cookie';
import * as crypto from 'node:crypto';

import { authConfig } from '../auth.config';
import { AuthDIToken } from '../auth.di-token';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  CSRF_TOKEN_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  LOGIN_SESSION_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './cookie.constant';
import {
  GetLoginSessionCookiePayload,
  GetTokensCookiePayload,
  LoginCookie,
} from './cookie.type';

const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

export class CookieService {
  private readonly key: string;
  private readonly algorithm: crypto.CipherGCMTypes;
  private readonly ivSize: number;
  private readonly authTagSize: number;
  private readonly cookieOptions: CookieSerializeOptions;

  constructor(
    @Inject(AuthDIToken.CONFIG)
    private readonly config: ConfigType<typeof authConfig>,
  ) {
    this.key = this.config.cookieCipherKey;
    this.algorithm = this.config.cookieCipherAlgorithm;
    this.ivSize = this.config.cookieCipherIVSize;
    this.authTagSize = this.config.cookieCipherAuthTagSize;
    this.cookieOptions = {
      httpOnly: true,
      sameSite: true,
      path: '/',
      expires: new Date(Date.now() + DAY_MILLISECONDS),
    };
  }

  getLogoutCookie() {
    const clearedLoginCookie = this.emptyLoginCookie();
    const clearedAccessTokenCookie = this.emptyAccessTokenCookie();
    const clearedRefreshTokenCookie = this.emptyRefreshTokenCookie();
    const clearedCSRFTokenCookie = this.emptyCSRFTokenCookie();
    const clearedIDTokenCookie = this.emptyIDTokenCookie();
    return [
      clearedLoginCookie,
      clearedAccessTokenCookie,
      clearedRefreshTokenCookie,
      clearedCSRFTokenCookie,
      clearedIDTokenCookie,
    ];
  }

  getLoginSessionCookie({ codeVerifier, state }: GetLoginSessionCookiePayload) {
    const encryptedLoginSession = this.encrypt(
      JSON.stringify({ codeVerifier, state }),
    );
    return serialize(LOGIN_SESSION_COOKIE_NAME, encryptedLoginSession, {
      ...this.cookieOptions,
    });
  }

  getTokensCookie({
    accessToken,
    refreshToken,
    csrfToken,
    idToken,
  }: GetTokensCookiePayload) {
    const accessTokenCookie = this.getAccessTokenCookie(accessToken);
    const refreshTokenCookie = this.getRefreshTokenCookie(refreshToken);
    const csrfTokenCookie = this.getCSRFTokenCookie(csrfToken);
    const idTokenCookie = this.getIDTokenCookie(idToken);
    return [
      accessTokenCookie,
      refreshTokenCookie,
      csrfTokenCookie,
      idTokenCookie,
    ];
  }

  getDecryptedLoginSession(encryptedLoginSession: string) {
    const loginCookieString = this.decrypt(encryptedLoginSession);
    return JSON.parse(loginCookieString) as LoginCookie;
  }

  getDecryptedCSRFToken(encryptedCSRFToken: string) {
    return this.decrypt(encryptedCSRFToken);
  }

  getDecryptedIDToken(encryptedIDToken: string) {
    return this.decrypt(encryptedIDToken);
  }

  private emptyLoginCookie() {
    return serialize(LOGIN_SESSION_COOKIE_NAME, '', {
      ...this.cookieOptions,
      expires: new Date(),
    });
  }

  private emptyAccessTokenCookie() {
    return serialize(ACCESS_TOKEN_COOKIE_NAME, '', {
      ...this.cookieOptions,
      expires: new Date(),
    });
  }

  private emptyRefreshTokenCookie() {
    return serialize(REFRESH_TOKEN_COOKIE_NAME, '', {
      ...this.cookieOptions,
      expires: new Date(),
    });
  }

  private emptyCSRFTokenCookie() {
    return serialize(CSRF_TOKEN_COOKIE_NAME, '', {
      ...this.cookieOptions,
      expires: new Date(),
    });
  }

  private emptyIDTokenCookie() {
    return serialize(ID_TOKEN_COOKIE_NAME, '', {
      ...this.cookieOptions,
      expires: new Date(),
    });
  }

  private getAccessTokenCookie(token: string) {
    const encryptedAccessToken = this.encrypt(token);
    return serialize(ACCESS_TOKEN_COOKIE_NAME, encryptedAccessToken, {
      ...this.cookieOptions,
    });
  }

  private getRefreshTokenCookie(token: string) {
    const encryptedRefreshToken = this.encrypt(token);
    return serialize(REFRESH_TOKEN_COOKIE_NAME, encryptedRefreshToken, {
      ...this.cookieOptions,
    });
  }

  private getCSRFTokenCookie(token: string) {
    const encryptedCSRFToken = this.encrypt(token);
    return serialize(CSRF_TOKEN_COOKIE_NAME, encryptedCSRFToken, {
      ...this.cookieOptions,
    });
  }

  private getIDTokenCookie(token: string) {
    const encryptedIDToken = this.encrypt(token);
    return serialize(ID_TOKEN_COOKIE_NAME, encryptedIDToken, {
      ...this.cookieOptions,
    });
  }

  private encrypt(value: string) {
    const iv = crypto.randomBytes(this.ivSize);
    const key = Buffer.from(this.key, 'hex');

    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);
    const result = Buffer.concat([iv, encrypted, cipher.getAuthTag()]);

    return result.toString('base64url');
  }

  private decrypt(encryptedValue: string) {
    this.validateEncryptedCookie(encryptedValue);
    const cookieString = this.decryptWithoutValidation(encryptedValue);
    return cookieString;
  }

  private validateEncryptedCookie(encryptedValue: string) {
    const encrypted = Buffer.from(encryptedValue, 'base64url');
    const minSize = this.ivSize + 1 + this.authTagSize;
    if (encrypted.length < minSize) throw new Error('Invalid cookie');
  }

  private decryptWithoutValidation(encryptedValue: string) {
    const { authTag, encrypted, iv } =
      this.decomposeEncryptedValue(encryptedValue);

    const key = Buffer.from(this.key, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = decipher.update(encrypted);
    const final = decipher.final();

    const result = Buffer.concat([decrypted, final]);
    return result.toString();
  }

  private decomposeEncryptedValue(encryptedValue: string) {
    const encoded = Buffer.from(encryptedValue, 'base64url');

    const iv = encoded.subarray(0, this.ivSize);
    const encrypted = encoded.subarray(
      this.ivSize,
      encoded.length - this.authTagSize,
    );
    const authTag = encoded.subarray(
      encoded.length - this.authTagSize,
      encoded.length,
    );

    return { iv, encrypted, authTag };
  }
}
