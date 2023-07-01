import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

import { Address } from '../value-object/address.value-object';
import { Contact } from '../value-object/contact.value-object';
import { ServiceSchedule } from '../value-object/service-schedule.value-object';
import { Table } from './table.entity';

export const OutletId = EntityId.brand<'OutletId'>();
export type OutletId = z.infer<typeof OutletId>;

export const OutletOrderId = EntityId.brand<'OutletOrderId'>();
export type OutletOrderId = z.infer<typeof OutletOrderId>;

export const OutletMenuId = EntityId.brand<'OutletMenuId'>();
export type OutletMenuId = z.infer<typeof OutletMenuId>;

export const OutletName = z.string().min(2).max(50).brand<'OutletName'>();
export type OutletName = z.infer<typeof OutletName>;

export const OutletTable = z.instanceof(Table).brand<'OutletTable'>();
export type OutletTable = z.infer<typeof OutletTable>;

export const OutletAddress = z.instanceof(Address).brand<'OutletAddress'>();
export type OutletAddress = z.infer<typeof OutletAddress>;

export const OutletContact = z.instanceof(Contact).brand<'OutletContact'>();
export type OutletContact = z.infer<typeof OutletContact>;

export const OutletServiceSchedule = z
  .instanceof(ServiceSchedule)
  .brand<'OutletServiceSchedule'>();
export type OutletServiceSchedule = z.infer<typeof OutletServiceSchedule>;

export type CreateOutletPayload = {
  menuIds: string[];
  orderIds: string[];
  name: string;
  tables: Table[];
  address: Address;
  contact: Contact;
  serviceSchedule: ServiceSchedule;
};
