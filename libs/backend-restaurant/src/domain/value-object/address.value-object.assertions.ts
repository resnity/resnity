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

type AssertAddressLine1Valid = (value: string) => asserts value is AddressLine1;
export const assertAddressLine1Valid: AssertAddressLine1Valid = (
  value: string,
) => validateOrThrowDomainError(AddressLine1, value);

type AssertMaybeAddressLine2Valid = (
  value?: string,
) => asserts value is AddressLine2 | undefined;
export const assertMaybeAddressLine2Valid: AssertMaybeAddressLine2Valid = (
  value?: string,
) => validateOrThrowDomainError(AddressLine2.optional(), value);

type AssertMaybeAddressLine3Valid = (
  value?: string,
) => asserts value is AddressLine3 | undefined;
export const assertMaybeAddressLine3Valid: AssertMaybeAddressLine3Valid = (
  value?: string,
) => validateOrThrowDomainError(AddressLine3.optional(), value);

type AssertAddressPostcodeValid = (
  value: string,
) => asserts value is AddressPostcode;
export const assertAddressPostcodeValid: AssertAddressPostcodeValid = (
  value: string,
) => validateOrThrowDomainError(AddressPostcode, value);

type AssertMaybeAddressCityValid = (
  value?: string,
) => asserts value is AddressCity | undefined;
export const assertMaybeAddressCityValid: AssertMaybeAddressCityValid = (
  value?: string,
) => validateOrThrowDomainError(AddressCity.optional(), value);

type AssertAddressStateValid = (value: string) => asserts value is AddressState;
export const assertAddressStateValid: AssertAddressStateValid = (
  value: string,
) => validateOrThrowDomainError(AddressState, value);

type AssertAddressCountryValid = (
  value: string,
) => asserts value is AddressCountry;
export const assertAddressCountryValid: AssertAddressCountryValid = (
  value: string,
) => validateOrThrowDomainError(AddressCountry, value);
