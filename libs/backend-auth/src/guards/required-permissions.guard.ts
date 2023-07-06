import { User } from '@auth0/auth0-spa-js';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  APP_CLS_USER,
  AppClsService,
  ForbiddenError,
  UnauthorizedError,
  isNil,
} from '@resnity/backend-common';

import {
  REQUIRED_PERMISSIONS_KEY,
  REQUIRED_PERMISSIONS_STRATEGY_KEY,
} from '../auth.constants';
import { Permission, RequiredPermissionsStrategy } from '../auth.types';

@Injectable()
export class RequiredPermissionsGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _appClsService: AppClsService<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const user = this._appClsService.get(APP_CLS_USER);
    if (isNil(user)) throw new UnauthorizedError();

    const userPermissions = user.permissions;
    const requiredPermissions = this._reflector.get<Permission[]>(
      REQUIRED_PERMISSIONS_KEY,
      context.getHandler(),
    );
    const requiredPermissionsStrategy =
      this._reflector.get<RequiredPermissionsStrategy>(
        REQUIRED_PERMISSIONS_STRATEGY_KEY,
        context.getHandler(),
      );

    if (
      !this.hasPermission(
        userPermissions,
        requiredPermissions,
        requiredPermissionsStrategy,
      )
    )
      throw new ForbiddenError();

    return true;
  }

  private hasPermission = (
    userPermissions: Permission[],
    requiredPermissions: Permission[],
    strategy: RequiredPermissionsStrategy,
  ) =>
    strategy === RequiredPermissionsStrategy.ALL
      ? this.handleRequiredAllPermissions(userPermissions, requiredPermissions)
      : this.handleRequiredOneOfPermissions(
          userPermissions,
          requiredPermissions,
        );

  private handleRequiredAllPermissions = (
    userPermissions: Permission[],
    requiredPermissions: Permission[],
  ) => {
    return requiredPermissions.every((requiredPermission) =>
      userPermissions.includes(requiredPermission),
    );
  };

  private handleRequiredOneOfPermissions = (
    userPermissions: Permission[],
    requiredPermissions: Permission[],
  ) => {
    return requiredPermissions.some((requiredPermission) =>
      userPermissions.includes(requiredPermission),
    );
  };
}
