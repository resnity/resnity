import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { authConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieService } from './cookie/cookie.service';
import { Auth0Client } from './oauth/clients/auth0.client';
import { OAuthService } from './oauth/oauth.service';
import { TokenService } from './token/token.service';

@Module({
  imports: [ConfigModule.forFeature(authConfig), HttpModule],
  controllers: [AuthController],
  providers: [
    Auth0Client,
    AuthService,
    CookieService,
    OAuthService,
    TokenService,
  ],
})
export class AuthModule {}
