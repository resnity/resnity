import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';

import { authConfig } from '../../auth.config';
import { AuthDIToken } from '../../auth.di-token';
import { GetTokenPayload } from './auth0.type';
import { GetTokenResponse } from './dtos/get-token.dto';

@Injectable()
export class Auth0Client {
  private readonly authorizationServerBaseURL: string;
  private readonly clientID: string;
  private readonly redirectURI: string;

  constructor(
    @Inject(AuthDIToken.CONFIG)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly httpService: HttpService,
  ) {
    this.clientID = this.config.oauthClientID;
    this.authorizationServerBaseURL = this.config.oauthAuthorizationServerURL;
    this.redirectURI = this.config.oauthRedirectURI;
  }

  async getToken({
    code,
    codeVerifier,
  }: GetTokenPayload): Promise<GetTokenResponse> {
    const authorizationServerBaseURL = this.authorizationServerBaseURL;
    const clientID = this.clientID;
    const grantType = 'authorization_code';
    const redirectURI = this.redirectURI;

    const requestURL = `${authorizationServerBaseURL}/oauth/token`;
    const body = new URLSearchParams({
      grant_type: grantType,
      client_id: clientID,
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectURI,
    }).toString();
    const requestConfig: AxiosRequestConfig = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    const { data } = await this.httpService.axiosRef.post<GetTokenResponse>(
      requestURL,
      body,
      requestConfig,
    );
    return data;
  }
}
