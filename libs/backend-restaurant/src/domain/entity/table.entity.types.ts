import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

export const TableId = EntityId.brand<'TableId'>();
export type TableId = z.infer<typeof TableId>;

export const TableCode = z.string().min(4).max(12).brand<'TableCode'>();
export type TableCode = z.infer<typeof TableCode>;

export const TableCapacity = z
  .number()
  .int()
  .min(1)
  .max(100)
  .brand<'TableCapacity'>();
export type TableCapacity = z.infer<typeof TableCapacity>;

export type CreateTablePayload = {
  code: string;
  capacity: number;
};

export type UpdateTablePayload = {
  code?: string;
  capacity?: number;
};
