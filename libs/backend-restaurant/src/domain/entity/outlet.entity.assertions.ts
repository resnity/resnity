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

type AssertOutletIdValid = (value: string) => asserts value is OutletId;
export const assertOutletIdValid: AssertOutletIdValid = (value: string) =>
  validateOrThrowDomainError(OutletId, value);

type AssertOutletOrderIdsValid = (
  values: string[],
) => asserts values is OutletOrderId[];
export const assertOutletOrderIdsValid: AssertOutletOrderIdsValid = (
  values: string[],
) => validateOrThrowDomainError(OutletOrderId.array(), values);

type AssertOutletMenuIdsValid = (
  values: string[],
) => asserts values is OutletMenuId[];
export const assertOutletMenuIdsValid: AssertOutletMenuIdsValid = (
  values: string[],
) => validateOrThrowDomainError(OutletMenuId.array(), values);

type AssertOutletNameValid = (value: string) => asserts value is OutletName;
export const assertOutletNameValid: AssertOutletNameValid = (value: string) =>
  validateOrThrowDomainError(OutletName, value);

type AssertOutletTablesValid = (
  values: Table[],
) => asserts values is OutletTable[];
export const assertOutletTablesValid: AssertOutletTablesValid = (
  values: Table[],
) => validateOrThrowDomainError(OutletTable, values);

type AssertOutletAddressValid = (
  value: Address,
) => asserts value is OutletAddress;
export const assertOutletAddressValid: AssertOutletAddressValid = (
  value: Address,
) => validateOrThrowDomainError(OutletAddress, value);

type AssertOutletContactValid = (
  value: Contact,
) => asserts value is OutletContact;
export const assertOutletContactValid: AssertOutletContactValid = (
  value: Contact,
) => validateOrThrowDomainError(OutletContact, value);

type AssertOutletServiceScheduleValid = (
  value: ServiceSchedule,
) => asserts value is OutletServiceSchedule;
export const assertOutletServiceScheduleValid: AssertOutletServiceScheduleValid =
  (value: ServiceSchedule) =>
    validateOrThrowDomainError(OutletServiceSchedule, value);
