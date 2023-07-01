import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';

export const LineItemId = EntityId.brand<'LineItemId'>();
export type LineItemId = z.infer<typeof LineItemId>;

export const LineItemMenuId = EntityId.brand<'LineItemMenuId'>();
export type LineItemMenuId = z.infer<typeof LineItemMenuId>;

export const LineItemMenuItemId = EntityId.brand<'LineItemMenuItemId'>();
export type LineItemMenuItemId = z.infer<typeof LineItemMenuItemId>;

export const LineItemName = z.string().min(2).max(50).brand<'LineItemName'>();
export type LineItemName = z.infer<typeof LineItemName>;

export const LineItemNote = z.string().min(2).max(50).brand<'LineItemNote'>();
export type LineItemNote = z.infer<typeof LineItemNote>;

export const LineItemPrice = z.instanceof(Price).brand<'LineItemPrice'>();
export type LineItemPrice = z.infer<typeof LineItemPrice>;

export const LineItemQuantity = z
  .number()
  .int()
  .nonnegative()
  .brand<'LineItemQuantity'>();
export type LineItemQuantity = z.infer<typeof LineItemQuantity>;

export const lineItemStatuses = ['PENDING', 'CANCELLED', 'FULFILLED'] as const;
export type RawLineItemStatus = (typeof lineItemStatuses)[number];
export const LineItemStatus = z
  .enum(lineItemStatuses)
  .brand<'LineItemStatus'>();
export type LineItemStatus = z.infer<typeof LineItemStatus>;
