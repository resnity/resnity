import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const authConfigSchema = z.object({
  cookieCipherKey: z.string(),
  cookieCipherAlgorithm: z.enum(['aes-128-gcm', 'aes-192-gcm', 'aes-256-gcm']),
  cookieCipherIVSize: z.coerce.number(),
  cookieCipherAuthTagSize: z.coerce.number(),
  cookieNamePrefix: z.string(),

  oauthClientID: z.string(),
  oauthClientSecret: z.string(),
  oauthAuthorizationServerURL: z.string(),
  oauthRedirectURI: z.string(),
  oauthResponseType: z.string(),
  oauthScope: z.string(),
});
export type AuthConfig = z.infer<typeof authConfigSchema>;

export const authConfig = registerAs<AuthConfig>('auth', () => {
  return authConfigSchema.parse({
    cookieCipherKey: process.env.AUTH_COOKIE_CIPHER_KEY,
    cookieCipherAlgorithm: process.env.AUTH_COOKIE_CIPHER_ALGORITHM,
    cookieCipherIVSize: process.env.AUTH_COOKIE_CIPHER_IV_SIZE,
    cookieCipherAuthTagSize: process.env.AUTH_COOKIE_CIPHER_AUTH_TAG_SIZE,
    cookieNamePrefix: process.env.AUTH_COOKIE_NAME_PREFIX,

    oauthAuthorizationServerURL:
      process.env.AUTH_OAUTH_AUTHORIZATION_SERVER_URL,
    oauthClientID: process.env.AUTH_OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.AUTH_OAUTH_CLIENT_SECRET,
    oauthRedirectURI: process.env.AUTH_OAUTH_REDIRECT_URI,
    oauthResponseType: process.env.AUTH_OAUTH_RESPONSE_TYPE,
    oauthScope: process.env.AUTH_OAUTH_SCOPE,
  });
});
