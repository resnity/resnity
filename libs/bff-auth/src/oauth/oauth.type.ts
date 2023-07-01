export type Token = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  tokenType: string;
  expiresIn: number;
};

export type ExchangeTokenPayload = {
  code: string;
  codeVerifier: string;
};

export type GetTokenPayload = {
  originalState: string;
  originalCodeVerifier: string;
  callbackState: string;
  callbackCode: string;
};

export type GetOIDCLogoutURLPayload = {
  idToken: string;
  returnTo: string;
};
