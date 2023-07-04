import { validateOrThrowDomainError } from '@resnity/backend-common';

import { ContactEmail, ContactPhoneNumber } from './contact.value-object.types';

type AssertContactPhoneNumberValid = (
  value: string,
) => asserts value is ContactPhoneNumber;
export const assertContactPhoneNumberValid: AssertContactPhoneNumberValid = (
  value: string,
) => validateOrThrowDomainError(ContactPhoneNumber, value);

type AssertMaybeContactEmailValid = (
  value?: string,
) => asserts value is ContactEmail | undefined;
export const assertMaybeEmailValid: AssertMaybeContactEmailValid = (
  value?: string,
) => validateOrThrowDomainError(ContactEmail.optional(), value);
