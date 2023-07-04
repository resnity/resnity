import { validateOrThrowDomainError } from '@resnity/backend-common';

import { TableCapacity, TableCode, TableId } from './table.entity.types';

type AssertTableIdValid = (value: string) => asserts value is TableId;
export const assertTableIdValid: AssertTableIdValid = (value: string) =>
  validateOrThrowDomainError(TableId, value);

type AssertTableCodeValid = (value: string) => asserts value is TableCode;
export const assertTableCodeValid: AssertTableCodeValid = (value: string) =>
  validateOrThrowDomainError(TableCode, value);

type AssertTableCapacityValid = (
  value: number,
) => asserts value is TableCapacity;
export const assertTableCapacityValid: AssertTableCapacityValid = (
  value: number,
) => validateOrThrowDomainError(TableCapacity, value);
