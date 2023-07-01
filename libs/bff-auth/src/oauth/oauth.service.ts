import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as crypto from 'node:crypto';

import { authConfig } from '../auth.config';
import { AuthDIToken } from '../auth.di-token';
import { Auth0Client } from './clients/auth0.client';
import { GetOIDCLogoutURLPayload, GetTokenPayload } from './oauth.type';

@Injectable()
export class OAuthService {
  private readonly clientID: string;
  private readonly authorizationServerURL: string;
  private readonly redirectUri: string;
  private readonly responseType: string;
  private readonly scope: string;

  constructor(
    @Inject(AuthDIToken.CONFIG)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly auth0Client: Auth0Client,
  ) {
    this.clientID = this.config.oauthClientID;
    this.authorizationServerURL = this.config.oauthAuthorizationServerURL;
    this.redirectUri = this.config.oauthRedirectURI;
    this.responseType = this.config.oauthResponseType;
    this.scope = this.config.oauthScope;
  }

  getAuthorizationCodeFlowWithPKCELoginData() {
    const authorizationServerURL = this.authorizationServerURL;
    const clientID = this.clientID;
    const responseType = this.responseType;
    const redirectURI = this.redirectUri;
    const scope = this.scope;

    const state = this.generateRandomString();
    const codeVerifier = this.generateRandomString();
    const codeChallenge = this.generateHash(codeVerifier);
    const codeChallengeMethod = 'S256';

    const url = new URL(`${authorizationServerURL}/authorize`);
    url.searchParams.append('client_id', clientID);
    url.searchParams.append('response_type', responseType);
    url.searchParams.append('redirect_uri', redirectURI);
    url.searchParams.append('state', state);
    url.searchParams.append('code_challenge', codeChallenge);
    url.searchParams.append('code_challenge_method', codeChallengeMethod);
    url.searchParams.append('scope', scope);

    return { authorizationURL: url.toString(), codeVerifier, state };
  }

  async getToken({
    callbackCode,
    callbackState,
    originalCodeVerifier,
    originalState,
  }: GetTokenPayload) {
    if (callbackState !== originalState) throw new UnauthorizedException();

    const tokenResponse = await this.auth0Client.getToken({
      code: callbackCode,
      codeVerifier: originalCodeVerifier,
    });

    return {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      idToken: tokenResponse.id_token,
      expiresIn: tokenResponse.expires_in,
      tokenType: tokenResponse.token_type,
    };
  }

  getOIDCLogoutURL({ idToken, returnTo }: GetOIDCLogoutURLPayload) {
    const authorizationServerURL = this.authorizationServerURL;

    const url = new URL(`${authorizationServerURL}/oidc/logout`);
    url.searchParams.append('id_token_hint', idToken);
    url.searchParams.append('post_logout_redirect_uri', returnTo);

    return url.toString();
  }

  private generateHash(value: string) {
    const hash = crypto.createHash('sha256');
    hash.update(value);
    return hash.digest('base64url');
  }

  private generateRandomString() {
    return crypto.randomBytes(64).toString('base64url');
  }
}
