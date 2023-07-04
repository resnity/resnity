import { validateOrThrowDomainError } from '@resnity/backend-common';

import {
  ServiceScheduleName,
  ServiceScheduleTimePeriod,
} from './service-schedule.value-object.types';
import { TimePeriod } from './time-period.value-object';

type AssertServiceScheduleNameValid = (
  value: string,
) => asserts value is ServiceScheduleName;
export const assertServiceScheduleNameValid: AssertServiceScheduleNameValid = (
  value: string,
) => validateOrThrowDomainError(ServiceScheduleName, value);

type AssertServiceScheduleTimePeriodValid = (
  value: TimePeriod,
) => asserts value is ServiceScheduleTimePeriod;
export const assertServiceScheduleTimePeriodValid: AssertServiceScheduleTimePeriodValid =
  (value: TimePeriod) =>
    validateOrThrowDomainError(ServiceScheduleTimePeriod, value);
