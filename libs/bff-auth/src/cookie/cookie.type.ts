export type LoginCookie = {
  codeVerifier: string;
  state: string;
};

export type GetLoginSessionCookiePayload = {
  codeVerifier: string;
  state: string;
};

export type GetTokensCookiePayload = {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
  idToken: string;
};
