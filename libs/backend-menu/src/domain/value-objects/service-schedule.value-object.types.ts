import { z } from 'zod';

import { TimePeriod } from './time-period.value-object';

export const ServiceScheduleName = z
  .string()
  .min(2)
  .max(50)
  .brand<'ServiceScheduleName'>();
export type ServiceScheduleName = z.infer<typeof ServiceScheduleName>;

export const ServiceScheduleTimePeriod = z
  .instanceof(TimePeriod)
  .brand<'ServiceScheduleTimePeriod'>();
export type ServiceScheduleTimePeriod = z.infer<
  typeof ServiceScheduleTimePeriod
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
