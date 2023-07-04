import { z } from 'zod';

import {
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { TimePeriod } from './time-period.value-object';

const serviceScheduleNameSchema = z
  .string()
  .min(2)
  .max(50)
  .brand<'ServiceScheduleName'>();

const serviceScheduleTimePeriodSchema = z
  .instanceof(TimePeriod)
  .brand<'ServiceScheduleTimePeriod'>();

export const assertServiceScheduleNameValid: Validate<
  typeof serviceScheduleNameSchema
> = domainSchemaValidatorBuilder(serviceScheduleNameSchema);

export const assertServiceScheduleTimePeriodValid: Validate<
  typeof serviceScheduleTimePeriodSchema
> = domainSchemaValidatorBuilder(serviceScheduleTimePeriodSchema);

export type ServiceScheduleName = z.infer<typeof serviceScheduleNameSchema>;

export type ServiceScheduleTimePeriod = z.infer<
  typeof serviceScheduleTimePeriodSchema
>;

export type CreateServiceSchedulePayload = {
  name: string;
  monday: TimePeriod;
  tuesday: TimePeriod;
  wednesday: TimePeriod;
  thursday: TimePeriod;
  friday: TimePeriod;
  saturday: TimePeriod;
  sunday: TimePeriod;
};
