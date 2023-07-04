import { validateOrThrowDomainError } from '@resnity/backend-common';

import {
  TimePeriodEndTime,
  TimePeriodStartTime,
} from './time-period.value-object.types';

type AssertTimePeriodStartTimeValid = (
  value: string,
) => asserts value is TimePeriodStartTime;
export const assertTimePeriodStartTimeValid: AssertTimePeriodStartTimeValid = (
  value: string,
) => validateOrThrowDomainError(TimePeriodStartTime, value);

type AssertTimePeriodEndTimeValid = (
  value: string,
) => asserts value is TimePeriodEndTime;
export const assertTimePeriodEndTimeValid: AssertTimePeriodEndTimeValid = (
  value: string,
) => validateOrThrowDomainError(TimePeriodEndTime, value);
