import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import {
  REQUIRED_PERMISSIONS_KEY,
  REQUIRED_PERMISSIONS_STRATEGY_KEY,
} from './auth.constants';
import { Permission, RequiredPermissionsStrategy } from './auth.types';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RequiredPermissionsGuard } from './guards/required-permissions.guard';

type AuthOptions = {
  requiredPermissions?: Permission[];
  requiredPermissionsStrategy?: RequiredPermissionsStrategy;
};

const defaultAuthOptions: AuthOptions = {
  requiredPermissions: [],
  requiredPermissionsStrategy: RequiredPermissionsStrategy.ALL,
};

export const Auth = (options?: AuthOptions) => {
  const { requiredPermissions, requiredPermissionsStrategy } = {
    ...defaultAuthOptions,
    ...options,
  };
  return applyDecorators(
    SetMetadata(REQUIRED_PERMISSIONS_KEY, requiredPermissions),
    SetMetadata(REQUIRED_PERMISSIONS_STRATEGY_KEY, requiredPermissionsStrategy),
    UseGuards(AccessTokenGuard, RequiredPermissionsGuard),
  );
};
