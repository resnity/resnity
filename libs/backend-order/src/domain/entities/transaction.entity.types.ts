import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';

export const TransactionId = EntityId.brand<'TransactionId'>();
export type TransactionId = z.infer<typeof TransactionId>;

export const TransactionPayerUserId = EntityId;
export type TransactionPayerUserId = z.infer<typeof TransactionPayerUserId>;

export const TransactionPrice = z.instanceof(Price).brand<'TransactionPrice'>();
export type TransactionPrice = z.infer<typeof TransactionPrice>;

export const transactionStatuses = [
  'DRAFT',
  'OPEN',
  'VOID',
  'PAID',
  'UNCOLLECTIBLE',
] as const;
export type RawTransactionStatus = (typeof transactionStatuses)[number];
export const TransactionStatus = z
  .enum(transactionStatuses)
  .brand<'TransactionStatus'>();
export type TransactionStatus = z.infer<typeof TransactionStatus>;
