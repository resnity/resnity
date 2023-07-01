import { createRemoteJWKSet, jwtVerify } from 'jose';

import { Environment, UnauthorizedError } from '@resnity/backend-common';

import { JwtPayload } from './jwt.types';

export interface JwtService {
  validate(token: string): Promise<JwtPayload>;
}

export class JwtServiceImpl {
  constructor(private readonly environment: Environment) {}

  async validate(token: string) {
    const audience = this.environment.AUTH0_AUDIENCE;
    const domain = this.environment.AUTH0_DOMAIN;

    const jwks = createRemoteJWKSet(
      new URL(`https://${domain}/.well-known/jwks.json`),
    );
    const jwtVerifyResult = await jwtVerify(token, jwks, { audience });

    const validationResult = await JwtPayload.safeParseAsync(
      jwtVerifyResult.payload,
    );
    if (!validationResult.success) throw new UnauthorizedError();

    return validationResult.data;
  }
}
