import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { Outlet } from './entity/outlet.entity';

const restaurantIdSchema = EntityId.brand<'RestaurantId'>();

const restaurantMenuIdSchema = EntityId.brand<'RestaurantMenuId'>();
const restaurantMenuIdsSchema = restaurantMenuIdSchema.array();

const restaurantNameSchema = z
  .string()
  .min(2)
  .max(50)
  .brand<'RestaurantName'>();

const restaurantOutletSchema = z.instanceof(Outlet).brand<'RestaurantOutlet'>();
const restaurantOutletsSchema = restaurantOutletSchema.array();

export const assertRestaurantIdValid: Validate<typeof restaurantIdSchema> =
  domainSchemaValidatorBuilder(restaurantIdSchema);

export const assertRestaurantMenuIdValid: Validate<
  typeof restaurantMenuIdSchema
> = domainSchemaValidatorBuilder(restaurantMenuIdSchema);
export const assertRestaurantMenuIdsValid: Validate<
  typeof restaurantMenuIdsSchema
> = domainSchemaValidatorBuilder(restaurantMenuIdsSchema);

export const assertRestaurantNameValid: Validate<typeof restaurantNameSchema> =
  domainSchemaValidatorBuilder(restaurantNameSchema);

export const assertRestaurantOutletValid: Validate<
  typeof restaurantOutletSchema
> = domainSchemaValidatorBuilder(restaurantOutletSchema);
export const assertRestaurantOutletsValid: Validate<
  typeof restaurantOutletsSchema
> = domainSchemaValidatorBuilder(restaurantOutletsSchema);

export type RestaurantId = z.infer<typeof restaurantIdSchema>;

export type RestaurantName = z.infer<typeof restaurantNameSchema>;

export type RestaurantOutlet = z.infer<typeof restaurantOutletSchema>;

export type RestaurantMenuId = z.infer<typeof restaurantMenuIdSchema>;

export type CreateRestaurantPayload = {
  name: string;
  menuIds: string[];
};

export type UpdateRestaurantPayload = {
  menuIds?: string[];
  name?: string;
};
