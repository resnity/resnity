import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';

export const LineItemModifierId = EntityId.brand<'LineItemModifierId'>();
export type LineItemModifierId = z.infer<typeof LineItemModifierId>;

export const LineItemModifierMenuId =
  EntityId.brand<'LineItemModifierMenuId'>();
export type LineItemModifierMenuId = z.infer<typeof LineItemModifierMenuId>;

export const LineItemModifierMenuModifierId =
  EntityId.brand<'LineItemModifierMenuModifierId'>();
export type LineItemModifierMenuModifierId = z.infer<
  typeof LineItemModifierMenuModifierId
>;

export const LineItemModifierName = z
  .string()
  .min(2)
  .max(50)
  .brand<'LineItemModifierName'>();
export type LineItemModifierName = z.infer<typeof LineItemModifierName>;

export const LineItemModifierPrice = z
  .instanceof(Price)
  .brand<'LineItemModifierPrice'>();
export type LineItemModifierPrice = z.infer<typeof LineItemModifierPrice>;

export const LineItemModifierQuantity = z
  .number()
  .int()
  .min(1)
  .brand<'LineItemModifierQuantity'>();
export type LineItemModifierQuantity = z.infer<typeof LineItemModifierQuantity>;
