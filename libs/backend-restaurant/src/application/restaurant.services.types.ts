import { CreateAddressPayload } from '../domain/value-object/address.value-object.types';
import { CreateContactPayload } from '../domain/value-object/contact.value-object.types';
import { CreateTimePeriodPayload } from '../domain/value-object/time-period.value-object.types';

export type CreateRestaurantServicePayload = {
  name: string;
};

export type UpdateRestaurantServicePayload = {
  menuIds?: string[];
  name?: string;
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

export type CreateOutletServicePayload = {
  menuIds: string[];
  orderIds: string[];
  name: string;
  address: CreateAddressServicePayload;
  contact: CreateContactServicePayload;
  serviceSchedule: CreateServiceScheduleServicePayload;
};

export type UpdateOutletServicePayload = {
  menuIds?: string[];
  orderIds?: string[];
  name?: string;
  address?: CreateAddressServicePayload;
  contact?: CreateContactServicePayload;
  serviceSchedule?: CreateServiceScheduleServicePayload;
};
