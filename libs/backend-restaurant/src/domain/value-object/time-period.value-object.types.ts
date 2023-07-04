import { z } from 'zod';

import {
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const timePeriodStartTimeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}:\d{2}$/)
  .brand<'TimePeriodStartTime'>();

const timePeriodEndTimeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}:\d{2}$/)
  .brand<'TimePeriodEndTime'>();

export const assertTimePeriodStartTimeValid: Validate<
  typeof timePeriodStartTimeSchema
> = domainSchemaValidatorBuilder(timePeriodStartTimeSchema);

export const assertTimePeriodEndTimeValid: Validate<
  typeof timePeriodEndTimeSchema
> = domainSchemaValidatorBuilder(timePeriodEndTimeSchema);

export type TimePeriodStartTime = z.infer<typeof timePeriodStartTimeSchema>;

export type TimePeriodEndTime = z.infer<typeof timePeriodEndTimeSchema>;

export type CreateTimePeriodPayload = {
  startTime: string;
  endTime: string;
};
