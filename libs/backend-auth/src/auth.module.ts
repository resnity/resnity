import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';

import { AppClsModule } from '@resnity/backend-common';

import { AccessTokenGuard } from './guards/access-token.guard';
import { JwtModule } from './jwt/jwt.module';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    AppClsModule,
    CacheModule.register(),
    JwtModule,
    OrganizationModule,
    UserModule,
  ],
  providers: [AccessTokenGuard],
  exports: [AccessTokenGuard, JwtModule, OrganizationModule, UserModule],
})
export class AuthModule {}
