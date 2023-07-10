import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import {
  APP_CLS_TENANT_ID,
  APP_CLS_USER,
  AppClsService,
  UnauthorizedError,
} from '@resnity/backend-common';

import {
  JWT_SERVICE_TOKEN,
  ORGANIZATION_SERVICE_TOKEN,
  USER_SERVICE_TOKEN,
} from '../auth.constants';
import { JwtService } from '../jwt/jwt.service';
import { OrganizationService } from '../organization/organization.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.service.types';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(JWT_SERVICE_TOKEN) private readonly _jwtService: JwtService,
    @Inject(USER_SERVICE_TOKEN) private readonly _userService: UserService,
    @Inject(ORGANIZATION_SERVICE_TOKEN)
    private readonly _organizationService: OrganizationService,
    private readonly _appClsService: AppClsService<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) return false;

    try {
      const jwtPayload = await this._jwtService.validate(token);
      const user = await this._userService.getUserByAccessToken(token);
      const organization = await this._organizationService.getOrganizationById(
        user.org_id,
      );

      console.log(organization);

      user.permissions = jwtPayload.permissions;

      this._appClsService.set(APP_CLS_TENANT_ID, user.org_id);
      this._appClsService.set(APP_CLS_USER, user);
    } catch (err) {
      throw new UnauthorizedError();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
