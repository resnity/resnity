import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { CreateAddressPayload } from '../value-object/address.value-object.types';
import { CreateContactPayload } from '../value-object/contact.value-object.types';
import { CreateServiceSchedulePayload } from '../value-object/service-schedule.value-object.types';
import { CreateTablePayload } from './table.entity.types';

const outletIdSchema = EntityId.brand<'OutletId'>();

const outletNameSchema = z.string().min(2).max(50).brand<'OutletName'>();

export const assertOutletIdValid: Validate<typeof outletIdSchema> =
  domainSchemaValidatorBuilder(outletIdSchema);

export const assertOutletNameValid: Validate<typeof outletNameSchema> =
  domainSchemaValidatorBuilder(outletNameSchema);

export type OutletId = z.infer<typeof outletIdSchema>;

export type OutletName = z.infer<typeof outletNameSchema>;

export type CreateOutletPayload = {
  menuIds: string[];
  orderIds: string[];
  name: string;
  tables: CreateTablePayload[];
  address: CreateAddressPayload;
  contact: CreateContactPayload;
  serviceSchedule: CreateServiceSchedulePayload;
};

export type UpdateOutletPayload = {
  menuIds?: string[];
  orderIds?: string[];
  name?: string;
  address?: CreateAddressPayload;
  contact?: CreateContactPayload;
  serviceSchedule?: CreateServiceSchedulePayload;
};
