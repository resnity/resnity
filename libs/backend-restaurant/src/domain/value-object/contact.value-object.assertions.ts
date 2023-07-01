import { validateOrThrowDomainError } from '@resnity/backend-common';

import { ContactEmail, ContactPhoneNumber } from './contact.value-object.types';

type AssertContactPhoneNumber = (
  value: string,
) => asserts value is ContactPhoneNumber;
export const assertContactPhoneNumber: AssertContactPhoneNumber = (
  value: string,
) => validateOrThrowDomainError(ContactPhoneNumber, value);

type AssertOptionalContactEmail = (
  value?: string,
) => asserts value is ContactEmail | undefined;
export const assertOptionalEmail: AssertOptionalContactEmail = (
  value?: string,
) => validateOrThrowDomainError(ContactEmail.optional(), value);
