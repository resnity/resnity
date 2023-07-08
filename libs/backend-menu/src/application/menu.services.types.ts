import { CreateImagePayload } from '../domain/value-objects/image.value-object.types';
import { CreatePricePayload } from '../domain/value-objects/price.value-object.types';
import { CreateServiceSchedulePayload } from '../domain/value-objects/service-schedule.value-object.types';
import { CreateTimePeriodPayload } from '../domain/value-objects/time-period.value-object.types';

export type CreateMenuServicePayload = {
  restaurantId: string;
  name: string;
};

export type UpdateMenuServicePayload = {
  name?: string;
};

export type CreateTimePeriodServicePayload = CreateTimePeriodPayload;

export type CreateServiceScheduleServicePayload = CreateServiceSchedulePayload;

export type CreatePriceServicePayload = CreatePricePayload;

export type CreateImageServicePayload = CreateImagePayload;

export type CreateCategoryServicePayload = {
  itemIds: string[];
  name: string;
  serviceSchedule: CreateServiceScheduleServicePayload;
};

export type UpdateCategoryServicePayload = {
  itemIds?: string[];
  name?: string;
  serviceSchedule?: CreateServiceScheduleServicePayload;
};

export type CreateItemServicePayload = {
  modifierIds: string[];
  name: string;
  price: CreatePriceServicePayload;
  images: CreateImageServicePayload[];
};

export type UpdateItemServicePayload = {
  modifierIds?: string[];
  name?: string;
  price?: CreatePriceServicePayload;
  images?: CreateImageServicePayload[];
};

export type CreateModifierServicePayload = {
  itemId: string;
  name: string;
  minSelection: number;
  maxSelection: number;
  isRepeatable: boolean;
  price: CreatePriceServicePayload;
};

export type UpdateModifierServicePayload = {
  name?: string;
  minSelection?: number;
  maxSelection?: number;
  isRepeatable?: boolean;
  price?: CreatePriceServicePayload;
};
