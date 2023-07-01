import { validateOrThrowDomainError } from '@resnity/backend-common';

import {
  ServiceScheduleName,
  ServiceScheduleTimePeriod,
} from './service-schedule.value-object.types';
import { TimePeriod } from './time-period.value-object';

type AssertServiceScheduleName = (
  value: string,
) => asserts value is ServiceScheduleName;
export const assertServiceScheduleName: AssertServiceScheduleName = (
  value: string,
) => validateOrThrowDomainError(ServiceScheduleName, value);

type AssertServiceScheduleTimePeriod = (
  value: TimePeriod,
) => asserts value is ServiceScheduleTimePeriod;
export const assertServiceScheduleTimePeriod: AssertServiceScheduleTimePeriod =
  (value: TimePeriod) =>
    validateOrThrowDomainError(ServiceScheduleTimePeriod, value);
