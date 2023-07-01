import { Global, Module, Provider } from '@nestjs/common';

import {
  AppClsModule,
  ENVIRONMENT_TOKEN,
  Environment,
} from '@resnity/backend-common';

import { AUTH0_CLIENT_TOKEN, AUTH_SERVICE_TOKEN } from './auth.constants';
import { Auth0Client, Auth0ClientImpl } from './clients/auth0.client';
import { AccessTokenGuard } from './guards/access-token.guard';
import { JwtModule } from './jwt/jwt.module';
import { AuthServiceImpl } from './services/auth.service';

const auth0ClientProvider: Provider = {
  provide: AUTH0_CLIENT_TOKEN,
  useFactory: (environment: Environment) => new Auth0ClientImpl(environment),
  inject: [ENVIRONMENT_TOKEN],
};

const authService: Provider = {
  provide: AUTH_SERVICE_TOKEN,
  useFactory: (auth0Client: Auth0Client) => new AuthServiceImpl(auth0Client),
  inject: [AUTH0_CLIENT_TOKEN],
};

@Global()
@Module({
  imports: [AppClsModule, JwtModule],
  providers: [auth0ClientProvider, authService, AccessTokenGuard],
  exports: [authService, AccessTokenGuard, JwtModule],
})
export class AuthModule {}
