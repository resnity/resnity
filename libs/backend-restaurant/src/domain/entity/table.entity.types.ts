import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const tableIdSchema = EntityId.brand<'TableId'>();

const tableCodeSchema = z.string().min(4).max(12).brand<'TableCode'>();

const tableCapacitySchema = z
  .number()
  .int()
  .min(1)
  .max(100)
  .brand<'TableCapacity'>();

export const assertTableIdValid: Validate<typeof tableIdSchema> =
  domainSchemaValidatorBuilder(tableIdSchema);

export const assertTableCodeValid: Validate<typeof tableCodeSchema> =
  domainSchemaValidatorBuilder(tableCodeSchema);

export const assertTableCapacityValid: Validate<typeof tableCapacitySchema> =
  domainSchemaValidatorBuilder(tableCapacitySchema);

export type TableId = z.infer<typeof tableIdSchema>;

export type TableCode = z.infer<typeof tableCodeSchema>;

export type TableCapacity = z.infer<typeof tableCapacitySchema>;

export type CreateTablePayload = {
  code: string;
  capacity: number;
};

export type UpdateTablePayload = {
  code?: string;
  capacity?: number;
};
