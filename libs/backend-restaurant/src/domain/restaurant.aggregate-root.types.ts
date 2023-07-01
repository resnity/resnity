import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

import { Outlet } from './entity/outlet.entity';

export const RestaurantId = EntityId.brand<'RestaurantId'>();
export type RestaurantId = z.infer<typeof RestaurantId>;

export const RestaurantName = z
  .string()
  .min(2)
  .max(50)
  .brand<'RestaurantName'>();
export type RestaurantName = z.infer<typeof RestaurantName>;

export const RestaurantOutlet = z
  .instanceof(Outlet)
  .brand<'RestaurantOutlet'>();
export type RestaurantOutlet = z.infer<typeof RestaurantOutlet>;

export const RestaurantMenuId = EntityId.brand<'RestaurantMenuId'>();
export type RestaurantMenuId = z.infer<typeof RestaurantMenuId>;

export type CreateRestaurantPayload = {
  name: string;
  outlets: Outlet[];
  menuIds: string[];
};
