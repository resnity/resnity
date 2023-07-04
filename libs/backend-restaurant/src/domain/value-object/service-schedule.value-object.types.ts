import { z } from 'zod';

import {
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { CreateTimePeriodPayload } from './time-period.value-object.types';

const serviceScheduleNameSchema = z
  .string()
  .min(2)
  .max(50)
  .brand<'ServiceScheduleName'>();

export const assertServiceScheduleNameValid: Validate<
  typeof serviceScheduleNameSchema
> = domainSchemaValidatorBuilder(serviceScheduleNameSchema);

export type ServiceScheduleName = z.infer<typeof serviceScheduleNameSchema>;

export type CreateServiceSchedulePayload = {
  name: string;
  monday: CreateTimePeriodPayload;
  tuesday: CreateTimePeriodPayload;
  wednesday: CreateTimePeriodPayload;
  thursday: CreateTimePeriodPayload;
  friday: CreateTimePeriodPayload;
  saturday: CreateTimePeriodPayload;
  sunday: CreateTimePeriodPayload;
};
