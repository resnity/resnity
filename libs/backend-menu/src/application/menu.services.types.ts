import { z } from 'zod';

import { priceCurrencies } from '../domain/value-objects/price.value-object.types';

export type CreateMenuServicePayload = {
  restaurantId: string;
  name: string;
};

export type UpdateMenuServicePayload = {
  name?: string;
};

export const AddCategoryServicePayload = z.object({
  name: z.string(),
  itemIds: z.array(z.string()),
  menuId: z.string(),
});
export type AddCategoryServicePayload = z.infer<
  typeof AddCategoryServicePayload
>;

export const AddItemServicePayload = z.object({
  name: z.string(),
  priceAmount: z.number(),
  priceCurrency: z.enum(priceCurrencies),
  imageUrls: z.array(z.string()),
  modifierIds: z.string().array(),
  menuId: z.string(),
});
export type AddItemServicePayload = z.infer<typeof AddItemServicePayload>;

export const AddModifierServicePayload = z.object({
  name: z.string(),
  priceAmount: z.number(),
  priceCurrency: z.enum(priceCurrencies),
  minSelection: z.number(),
  maxSelection: z.number(),
  isRepeatable: z.boolean(),
  menuId: z.string(),
  itemId: z.string(),
});
export type AddModifierServicePayload = z.infer<
  typeof AddModifierServicePayload
>;
