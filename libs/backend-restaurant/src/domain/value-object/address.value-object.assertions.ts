import { validateOrThrowDomainError } from '@resnity/backend-common';

import {
  AddressCity,
  AddressCountry,
  AddressLine1,
  AddressLine2,
  AddressLine3,
  AddressPostcode,
  AddressState,
} from './address.value-object.types';

type AssertAddressLine1 = (value: string) => asserts value is AddressLine1;
export const assertAddressLine1: AssertAddressLine1 = (value: string) =>
  validateOrThrowDomainError(AddressLine1, value);

type AssertOptionalAddressLine2 = (
  value?: string,
) => asserts value is AddressLine2 | undefined;
export const assertOptionalAddressLine2: AssertOptionalAddressLine2 = (
  value?: string,
) => validateOrThrowDomainError(AddressLine2.optional(), value);

type AssertOptionalAddressLine3 = (
  value?: string,
) => asserts value is AddressLine3 | undefined;
export const assertOptionalAddressLine3: AssertOptionalAddressLine3 = (
  value?: string,
) => validateOrThrowDomainError(AddressLine3.optional(), value);

type AssertAddressPostcode = (
  value: string,
) => asserts value is AddressPostcode;
export const assertAddressPostcode: AssertAddressPostcode = (value: string) =>
  validateOrThrowDomainError(AddressPostcode, value);

type AssertOptionalAddressCity = (
  value?: string,
) => asserts value is AddressCity | undefined;
export const assertOptionalAddressCity: AssertOptionalAddressCity = (
  value?: string,
) => validateOrThrowDomainError(AddressCity.optional(), value);

type AssertAddressState = (value: string) => asserts value is AddressState;
export const assertAddressState: AssertAddressState = (value: string) =>
  validateOrThrowDomainError(AddressState, value);

type AssertAddressCountry = (value: string) => asserts value is AddressCountry;
export const assertAddressCountry: AssertAddressCountry = (value: string) =>
  validateOrThrowDomainError(AddressCountry, value);
