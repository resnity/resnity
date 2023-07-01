import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'node:crypto';

import { GetLogoutDataPayload, GetTokenDataPayload } from './auth.type';
import { CookieService } from './cookie/cookie.service';
import { OAuthService } from './oauth/oauth.service';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cookieService: CookieService,
    private readonly oauthService: OAuthService,
    private readonly tokenService: TokenService,
  ) {}

  getLoginData() {
    const { authorizationURL, codeVerifier, state } =
      this.oauthService.getAuthorizationCodeFlowWithPKCELoginData();
    const loginSessionCookie = this.cookieService.getLoginSessionCookie({
      codeVerifier,
      state,
    });

    return {
      loginURL: authorizationURL,
      loginSessionCookie,
    };
  }

  async getTokenData({
    callbackCode,
    callbackState,
    encryptedCSRFToken,
    encryptedLoginSession,
  }: GetTokenDataPayload) {
    if (encryptedLoginSession === undefined) throw new UnauthorizedException();
    const { codeVerifier, state } = this.cookieService.getDecryptedLoginSession(
      encryptedLoginSession,
    );

    const { accessToken, refreshToken, idToken } =
      await this.oauthService.getToken({
        callbackCode,
        callbackState,
        originalCodeVerifier: codeVerifier,
        originalState: state,
      });

    this.tokenService.validateIDToken(idToken);

    const csrfToken = this.getValidCSRFToken(encryptedCSRFToken);
    const tokensCookie = this.cookieService.getTokensCookie({
      accessToken,
      refreshToken,
      csrfToken,
      idToken,
    });

    return { tokensCookie, csrfToken };
  }

  getLogoutData({ encryptedIDToken, returnTo }: GetLogoutDataPayload) {
    if (encryptedIDToken === undefined) throw new UnauthorizedException();

    const idToken = this.cookieService.getDecryptedIDToken(encryptedIDToken);
    const logoutURL = this.oauthService.getOIDCLogoutURL({ idToken, returnTo });
    const logoutCookie = this.cookieService.getLogoutCookie();

    return { logoutCookie, logoutURL };
  }

  private getValidCSRFToken(encryptedCSRFToken?: string) {
    if (encryptedCSRFToken === undefined) return this.generateRandomString();

    try {
      return this.cookieService.getDecryptedCSRFToken(encryptedCSRFToken);
    } catch (err) {
      return this.generateRandomString();
    }
  }

  private generateRandomString() {
    return crypto.randomBytes(64).toString('base64url');
  }
}
