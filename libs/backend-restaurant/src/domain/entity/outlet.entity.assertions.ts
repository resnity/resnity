import { validateOrThrowDomainError } from '@resnity/backend-common';

import { Address } from '../value-object/address.value-object';
import { Contact } from '../value-object/contact.value-object';
import { ServiceSchedule } from '../value-object/service-schedule.value-object';
import {
  OutletAddress,
  OutletContact,
  OutletId,
  OutletMenuId,
  OutletName,
  OutletOrderId,
  OutletServiceSchedule,
  OutletTable,
} from './outlet.entity.types';
import { Table } from './table.entity';

type AssertOutletId = (value: string) => asserts value is OutletId;
export const assertOutletId: AssertOutletId = (value: string) =>
  validateOrThrowDomainError(OutletId, value);

type AssertOutletOrderIds = (
  values: string[],
) => asserts values is OutletOrderId[];
export const assertOutletOrderIds: AssertOutletOrderIds = (values: string[]) =>
  validateOrThrowDomainError(OutletOrderId.array(), values);

type AssertOutletMenuIds = (
  values: string[],
) => asserts values is OutletMenuId[];
export const assertOutletMenuIds: AssertOutletMenuIds = (values: string[]) =>
  validateOrThrowDomainError(OutletMenuId.array(), values);

type AssertOutletName = (value: string) => asserts value is OutletName;
export const assertOutletName: AssertOutletName = (value: string) =>
  validateOrThrowDomainError(OutletName, value);

type AssertOutletTables = (values: Table[]) => asserts values is OutletTable[];
export const assertOutletTables: AssertOutletTables = (values: Table[]) =>
  validateOrThrowDomainError(OutletTable, values);

type AssertOutletAddress = (value: Address) => asserts value is OutletAddress;
export const assertOutletAddress: AssertOutletAddress = (value: Address) =>
  validateOrThrowDomainError(OutletAddress, value);

type AssertOutletContact = (value: Contact) => asserts value is OutletContact;
export const assertOutletContact: AssertOutletContact = (value: Contact) =>
  validateOrThrowDomainError(OutletContact, value);

type AssertOutletServiceSchedule = (
  value: ServiceSchedule,
) => asserts value is OutletServiceSchedule;
export const assertOutletServiceSchedule: AssertOutletServiceSchedule = (
  value: ServiceSchedule,
) => validateOrThrowDomainError(OutletServiceSchedule, value);
