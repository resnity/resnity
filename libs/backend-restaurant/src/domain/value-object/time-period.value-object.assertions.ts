import { validateOrThrowDomainError } from '@resnity/backend-common';

import {
  TimePeriodEndTime,
  TimePeriodStartTime,
} from './time-period.value-object.types';

type AssertTimePeriodStartTime = (
  value: string,
) => asserts value is TimePeriodStartTime;
export const assertTimePeriodStartTime: AssertTimePeriodStartTime = (
  value: string,
) => validateOrThrowDomainError(TimePeriodStartTime, value);

type AssertTimePeriodEndTime = (
  value: string,
) => asserts value is TimePeriodEndTime;
export const assertTimePeriodEndTime: AssertTimePeriodEndTime = (
  value: string,
) => validateOrThrowDomainError(TimePeriodEndTime, value);
