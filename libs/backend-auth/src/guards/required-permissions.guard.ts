import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ForbiddenError } from '@resnity/backend-common';

import {
  REQUIRED_PERMISSIONS_KEY,
  REQUIRED_PERMISSIONS_STRATEGY_KEY,
} from '../auth.constants';
import { Permission, RequiredPermissionsStrategy } from '../auth.types';
import { extractUserFromRequest } from '../libs/request';

@Injectable()
export class RequiredPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const user = await extractUserFromRequest(request);
    const userPermissions = user.permissions;
    const requiredPermissions = this.reflector.get<Permission[]>(
      REQUIRED_PERMISSIONS_KEY,
      context.getHandler(),
    );
    const requiredPermissionsStrategy =
      this.reflector.get<RequiredPermissionsStrategy>(
        REQUIRED_PERMISSIONS_STRATEGY_KEY,
        context.getHandler(),
      );

    if (
      !this.hasPermission(
        userPermissions,
        requiredPermissions,
        requiredPermissionsStrategy,
      )
    ) {
      throw new ForbiddenError();
    }

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
