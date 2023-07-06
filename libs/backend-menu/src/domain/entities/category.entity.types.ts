import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { CreateServiceSchedulePayload } from '../value-objects/service-schedule.value-object.types';

const categoryIdSchema = EntityId.brand<'CategoryId'>();

const categoryNameSchema = z.string().min(2).max(50).brand<'CategoryName'>();

export const assertCategoryIdValid: Validate<typeof categoryIdSchema> =
  domainSchemaValidatorBuilder(categoryIdSchema);

export const assertCategoryNameValid: Validate<typeof categoryNameSchema> =
  domainSchemaValidatorBuilder(categoryNameSchema);

export type CategoryId = z.infer<typeof categoryIdSchema>;

export type CategoryName = z.infer<typeof categoryNameSchema>;

export type CreateCategoryPayload = {
  name: string;
  itemIds: string[];
  serviceSchedule: CreateServiceSchedulePayload;
};

export type UpdateCategoryPayload = {
  name?: string;
  itemIds?: string[];
  serviceSchedule?: CreateServiceSchedulePayload;
};
