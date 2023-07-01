import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Terminal } from 'nestjs-cls';

import { AppClsService, UnauthorizedError } from '@resnity/backend-common';

import { AUTH_SERVICE_TOKEN, JWT_SERVICE_TOKEN } from '../auth.constants';
import { JwtService } from '../jwt/jwt.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/auth.types';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly _authService: AuthService,
    @Inject(JWT_SERVICE_TOKEN) private readonly _jwtService: JwtService,
    private readonly _appClsService: AppClsService<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) return false;

    try {
      const jwtPayload = await this._jwtService.validate(token);
      const user = await this._authService.getUserInfo(token);
      const orgId = jwtPayload.org_id;

      user.permissions = jwtPayload.permissions;

      this._appClsService.set('tenantId', orgId);
      this._appClsService.setUser(user);

      request.user = user;
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
