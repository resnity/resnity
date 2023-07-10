import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { CreateAddressPayload } from '../value-objects/address.value-object.types';
import { CreateContactPayload } from '../value-objects/contact.value-object.types';
import { CreateServiceSchedulePayload } from '../value-objects/service-schedule.value-object.types';
import { CreateTablePayload } from './table.entity.types';

const storeIdSchema = EntityId.brand<'StoreId'>();

const storeNameSchema = z.string().min(2).max(50).brand<'StoreName'>();

export const assertStoreIdValid: Validate<typeof storeIdSchema> =
  domainSchemaValidatorBuilder(storeIdSchema);

export const assertStoreNameValid: Validate<typeof storeNameSchema> =
  domainSchemaValidatorBuilder(storeNameSchema);

export type StoreId = z.infer<typeof storeIdSchema>;

export type StoreName = z.infer<typeof storeNameSchema>;

export type CreateStorePayload = {
  menuIds: string[];
  orderIds: string[];
  name: string;
  tables: CreateTablePayload[];
  address: CreateAddressPayload;
  contact: CreateContactPayload;
  serviceSchedule: CreateServiceSchedulePayload;
};

export type UpdateStorePayload = {
  menuIds?: string[];
  orderIds?: string[];
  name?: string;
  address?: CreateAddressPayload;
  contact?: CreateContactPayload;
  serviceSchedule?: CreateServiceSchedulePayload;
};
