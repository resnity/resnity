import { validateOrThrowDomainError } from '@resnity/backend-common';

import { TableCapacity, TableCode, TableId } from './table.entity.types';

type AssertTableId = (value: string) => asserts value is TableId;
export const assertTableId: AssertTableId = (value: string) =>
  validateOrThrowDomainError(TableId, value);

type AssertTableCode = (value: string) => asserts value is TableCode;
export const assertTableCode: AssertTableCode = (value: string) =>
  validateOrThrowDomainError(TableCode, value);

type AssertTableCapacity = (value: number) => asserts value is TableCapacity;
export const assertTableCapacity: AssertTableCapacity = (value: number) =>
  validateOrThrowDomainError(TableCapacity, value);
