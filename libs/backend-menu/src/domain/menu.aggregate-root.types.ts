import { z } from 'zod';

import { BaseEntityPayload, EntityId } from '@resnity/backend-common';

import { Category } from './entities/category.entity';
import { Item } from './entities/item.entity';
import { Modifier } from './entities/modifier.entity';

export const MenuId = EntityId.brand<'MenuId'>();
export type MenuId = z.infer<typeof MenuId>;

export const MenuRestaurantId = EntityId.brand<'MenuRestaurantId'>();
export type MenuRestaurantId = z.infer<typeof MenuRestaurantId>;

export const MenuName = z.string().brand<'MenuName'>();
export type MenuName = z.infer<typeof MenuName>;

export const MenuCategory = z.instanceof(Category).brand<'MenuCategory'>();
export type MenuCategory = z.infer<typeof MenuCategory>;

export const MenuItem = z.instanceof(Item).brand<'MenuItem'>();
export type MenuItem = z.infer<typeof MenuItem>;

export const MenuModifier = z.instanceof(Modifier).brand<'MenuModifier'>();
export type MenuModifier = z.infer<typeof MenuModifier>;

export type CreateMenuPayload = {
  restaurantId: string;
  name: string;
  categories: Category[];
  items: Item[];
  modifiers: Modifier[];
};

export type NewMenuPayload = BaseEntityPayload<CreateMenuPayload>;

export const UpdateMenuPayload = z.object({
  name: MenuName.optional(),
  categories: z.instanceof(Category).array().optional(),
  items: z.instanceof(Item).array().optional(),
  modifiers: z.instanceof(Modifier).array().optional(),
});
export type UpdateMenuPayload = z.infer<typeof UpdateMenuPayload>;
