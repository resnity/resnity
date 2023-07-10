import { CreateAddressPayload } from '../domain/value-objects/address.value-object.types';
import { CreateContactPayload } from '../domain/value-objects/contact.value-object.types';
import { CreateTimePeriodPayload } from '../domain/value-objects/time-period.value-object.types';

export type SetupRestaurantServicePayload = {
  id: string;
  name: string;
  displayName?: string;
};

export type CreateRestaurantServicePayload = {
  name: string;
  displayName?: string;
};

export type UpdateRestaurantServicePayload = {
  menuIds?: string[];
  name?: string;
  displayName?: string;
};

export type CreateAddressServicePayload = CreateAddressPayload;

export type CreateContactServicePayload = CreateContactPayload;

export type CreateTimePeriodServicePayload = CreateTimePeriodPayload;

export type CreateServiceScheduleServicePayload = {
  name: string;
  monday: CreateTimePeriodServicePayload;
  tuesday: CreateTimePeriodServicePayload;
  wednesday: CreateTimePeriodServicePayload;
  thursday: CreateTimePeriodServicePayload;
  friday: CreateTimePeriodServicePayload;
  saturday: CreateTimePeriodServicePayload;
  sunday: CreateTimePeriodServicePayload;
};

export type CreateStoreServicePayload = {
  menuIds: string[];
  orderIds: string[];
  name: string;
  address: CreateAddressServicePayload;
  contact: CreateContactServicePayload;
  serviceSchedule: CreateServiceScheduleServicePayload;
};

export type UpdateStoreServicePayload = {
  menuIds?: string[];
  orderIds?: string[];
  name?: string;
  address?: CreateAddressServicePayload;
  contact?: CreateContactServicePayload;
  serviceSchedule?: CreateServiceScheduleServicePayload;
};

export type CreateTableServicePayload = {
  code: string;
  capacity: number;
};

export type UpdateTableServicePayload = {
  code?: string;
  capacity?: number;
};
