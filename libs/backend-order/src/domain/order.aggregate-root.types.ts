import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

import { LineItem } from './entities/line-item.entity';
import { Transaction } from './entities/transaction.entity';

export const OrderId = EntityId.brand<'OrderId'>();
export type OrderId = z.infer<typeof OrderId>;

export const OrderRestaurantId = EntityId.brand<'OrderRestaurantId'>();
export type OrderRestaurantId = z.infer<typeof OrderRestaurantId>;

export const OrderOutletId = EntityId.brand<'OrderOutletId'>();
export type OrderOutletId = z.infer<typeof OrderOutletId>;

export const OrderTableId = EntityId.brand<'OrderTableId'>();
export type OrderTableId = z.infer<typeof OrderTableId>;

export const OrderCode = z.string().min(1).max(12).brand<'OrderCode'>();
export type OrderCode = z.infer<typeof OrderCode>;

export const orderStatuses = [
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'FULFILLED',
] as const;
export type RawOrderStatues = (typeof orderStatuses)[number];
export const OrderStatus = z.enum(orderStatuses).brand<'OrderStatus'>();
export type OrderStatus = z.infer<typeof OrderStatus>;

export const orderServiceTypes = [
  'EXTERNAL_DELIVERY',
  'TABLE',
  'TAKEAWAY',
] as const;
export type RawOrderServiceType = (typeof orderServiceTypes)[number];
export const OrderServiceType = z
  .enum(orderServiceTypes)
  .brand<'OrderServiceType'>();
export type OrderServiceType = z.infer<typeof OrderServiceType>;

export const OrderLineItem = z.instanceof(LineItem).brand<'OrderLineItem'>();
export type OrderLineItem = z.infer<typeof OrderLineItem>;

export const OrderTransaction = z
  .instanceof(Transaction)
  .brand<'OrderTransaction'>();
export type OrderTransaction = z.infer<typeof OrderTransaction>;
