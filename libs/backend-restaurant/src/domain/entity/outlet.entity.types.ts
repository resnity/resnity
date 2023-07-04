import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { Address } from '../value-object/address.value-object';
import { Contact } from '../value-object/contact.value-object';
import { ServiceSchedule } from '../value-object/service-schedule.value-object';
import { Table } from './table.entity';

const outletIdSchema = EntityId.brand<'OutletId'>();

const outletOrderIdSchema = EntityId.brand<'OutletOrderId'>();
const outletOrderIdsSchema = outletOrderIdSchema.array();

const outletMenuIdSchema = EntityId.brand<'OutletMenuId'>();
const outletMenuIdsSchema = outletMenuIdSchema.array();

const outletNameSchema = z.string().min(2).max(50).brand<'OutletName'>();

const outletTableSchema = z.instanceof(Table).brand<'OutletTable'>();
const outletTablesSchema = outletTableSchema.array();

const outletAddressSchema = z.instanceof(Address).brand<'OutletAddress'>();

const outletContactSchema = z.instanceof(Contact).brand<'OutletContact'>();

const outletServiceScheduleSchema = z
  .instanceof(ServiceSchedule)
  .brand<'OutletServiceSchedule'>();

export const assertOutletIdValid: Validate<typeof outletIdSchema> =
  domainSchemaValidatorBuilder(outletIdSchema);

export const assertOutletOrderIdsValid: Validate<typeof outletOrderIdsSchema> =
  domainSchemaValidatorBuilder(outletOrderIdsSchema);

export const assertOutletMenuIdsValid: Validate<typeof outletMenuIdsSchema> =
  domainSchemaValidatorBuilder(outletMenuIdsSchema);

export const assertOutletNameValid: Validate<typeof outletNameSchema> =
  domainSchemaValidatorBuilder(outletNameSchema);

export const assertOutletTablesValid: Validate<typeof outletTablesSchema> =
  domainSchemaValidatorBuilder(outletTablesSchema);

export const assertOutletAddressValid: Validate<typeof outletAddressSchema> =
  domainSchemaValidatorBuilder(outletAddressSchema);

export const assertOutletContactValid: Validate<typeof outletContactSchema> =
  domainSchemaValidatorBuilder(outletContactSchema);

export const assertOutletServiceScheduleValid: Validate<
  typeof outletServiceScheduleSchema
> = domainSchemaValidatorBuilder(outletServiceScheduleSchema);

export type OutletId = z.infer<typeof outletIdSchema>;

export type OutletOrderId = z.infer<typeof outletOrderIdSchema>;

export type OutletMenuId = z.infer<typeof outletMenuIdSchema>;

export type OutletName = z.infer<typeof outletNameSchema>;

export type OutletTable = z.infer<typeof outletTableSchema>;

export type OutletAddress = z.infer<typeof outletAddressSchema>;

export type OutletContact = z.infer<typeof outletContactSchema>;

export type OutletServiceSchedule = z.infer<typeof outletServiceScheduleSchema>;

export type CreateOutletPayload = {
  menuIds: string[];
  orderIds: string[];
  name: string;
  address: Address;
  contact: Contact;
  serviceSchedule: ServiceSchedule;
};

export type UpdateOutletPayload = {
  menuIds?: string[];
  orderIds?: string[];
  name?: string;
  address?: Address;
  contact?: Contact;
  serviceSchedule?: ServiceSchedule;
};
