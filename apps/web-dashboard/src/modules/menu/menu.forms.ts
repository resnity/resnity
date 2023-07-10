import { z } from 'zod';

import { CreateCategoryRequestDto } from '../../services/menu.services.types';

const startTimeSchema = z.string().regex(/^\d{2}:\d{2}:\d{2}$/);

const endTimeSchema = z.string().regex(/^\d{2}:\d{2}:\d{2}$/);

export const createMenuFormSchema = z.object({
  name: z.string().min(3).max(255),
});

export const createCategoryFormSchema = z.object({
  name: z.string().min(3).max(255),
  mondayStartTime: startTimeSchema,
  mondayEndTime: endTimeSchema,
  tuesdayStartTime: startTimeSchema,
  tuesdayEndTime: endTimeSchema,
  wednesdayStartTime: startTimeSchema,
  wednesdayEndTime: endTimeSchema,
  thursdayStartTime: startTimeSchema,
  thursdayEndTime: endTimeSchema,
  fridayStartTime: startTimeSchema,
  fridayEndTime: endTimeSchema,
  saturdayStartTime: startTimeSchema,
  saturdayEndTime: endTimeSchema,
  sundayStartTime: startTimeSchema,
  sundayEndTime: endTimeSchema,
});

export type CreateMenuFormData = z.infer<typeof createMenuFormSchema>;

export type CreateCategoryFormData = z.infer<typeof createCategoryFormSchema>;

export const defaultCreateCategoryFormData: CreateCategoryFormData = {
  name: '',
  mondayStartTime: '10:00:00',
  mondayEndTime: '22:00:00',
  tuesdayStartTime: '10:00:00',
  tuesdayEndTime: '22:00:00',
  wednesdayStartTime: '10:00:00',
  wednesdayEndTime: '22:00:00',
  thursdayStartTime: '10:00:00',
  thursdayEndTime: '22:00:00',
  fridayStartTime: '10:00:00',
  fridayEndTime: '22:00:00',
  saturdayStartTime: '10:00:00',
  saturdayEndTime: '22:00:00',
  sundayStartTime: '10:00:00',
  sundayEndTime: '22:00:00',
};

export const mapCreateCategoryFormDataToCreateCategoryRequestDto = (
  data: CreateCategoryFormData,
): CreateCategoryRequestDto => ({
  name: data.name,
  serviceSchedule: {
    name: `${data.name}'s service schedule`,
    monday: {
      startTime: data.mondayStartTime,
      endTime: data.mondayEndTime,
    },
    tuesday: {
      startTime: data.tuesdayStartTime,
      endTime: data.tuesdayEndTime,
    },
    wednesday: {
      startTime: data.wednesdayStartTime,
      endTime: data.wednesdayEndTime,
    },
    thursday: {
      startTime: data.thursdayStartTime,
      endTime: data.thursdayEndTime,
    },
    friday: {
      startTime: data.fridayStartTime,
      endTime: data.fridayEndTime,
    },
    saturday: {
      startTime: data.saturdayStartTime,
      endTime: data.saturdayEndTime,
    },
    sunday: {
      startTime: data.sundayStartTime,
      endTime: data.sundayEndTime,
    },
  },
});
