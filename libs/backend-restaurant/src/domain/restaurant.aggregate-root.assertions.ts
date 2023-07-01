import { validateOrThrowDomainError } from '@resnity/backend-common';

import { Outlet } from './entity/outlet.entity';
import {
  RestaurantId,
  RestaurantMenuId,
  RestaurantName,
  RestaurantOutlet,
} from './restaurant.aggregate-root.types';

type AssertRestaurantId = (value: string) => asserts value is RestaurantId;
export const assertRestaurantId: AssertRestaurantId = (id: string) =>
  validateOrThrowDomainError(RestaurantId, id);

type AssertRestaurantName = (name: string) => asserts name is RestaurantName;
export const assertRestaurantName: AssertRestaurantName = (name: string) =>
  validateOrThrowDomainError(RestaurantName, name);

type AssertRestaurantMenuId = (
  menuId: string,
) => asserts menuId is RestaurantMenuId;
export const assertRestaurantMenuId: AssertRestaurantMenuId = (
  menuId: string,
) => validateOrThrowDomainError(RestaurantMenuId, menuId);

type AssertRestaurantMenuIds = (
  menuIds: string[],
) => asserts menuIds is RestaurantMenuId[];
export const assertRestaurantMenuIds: AssertRestaurantMenuIds = (
  menuIds: string[],
) => validateOrThrowDomainError(RestaurantMenuId.array(), menuIds);

type AssertRestaurantOutlets = (
  outlets: Outlet[],
) => asserts outlets is RestaurantOutlet[];
export const assertRestaurantOutlets: AssertRestaurantOutlets = (
  outlets: Outlet[],
) => validateOrThrowDomainError(RestaurantOutlet.array(), outlets);
