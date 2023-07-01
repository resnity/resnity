import { z } from 'zod';

export const TimePeriodStartTime = z
  .string()
  .regex(/^\d{2}:\d{2}:\d{2}$/)
  .brand<'TimePeriodStartTime'>();
export type TimePeriodStartTime = z.infer<typeof TimePeriodStartTime>;

export const TimePeriodEndTime = z
  .string()
  .regex(/^\d{2}:\d{2}:\d{2}$/)
  .brand<'TimePeriodEndTime'>();
export type TimePeriodEndTime = z.infer<typeof TimePeriodEndTime>;

export type CreateTimePeriodPayload = {
  startTime: string;
  endTime: string;
};
