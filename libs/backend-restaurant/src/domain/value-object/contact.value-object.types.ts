import { z } from 'zod';

import {
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const contactPhoneNumberSchema = z
  .string()
  .min(8)
  .max(20)
  .brand<'ContactPhoneNumber'>();

const contactEmailSchema = z.string().email().brand<'ContactEmail'>();
const maybeContactEmailSchema = contactEmailSchema.optional();

export const assertContactPhoneNumberValid: Validate<
  typeof contactPhoneNumberSchema
> = domainSchemaValidatorBuilder(contactPhoneNumberSchema);

export const assertMaybeEmailValid: Validate<typeof maybeContactEmailSchema> =
  domainSchemaValidatorBuilder(maybeContactEmailSchema);

export type ContactPhoneNumber = z.infer<typeof contactPhoneNumberSchema>;

export type ContactEmail = z.infer<typeof contactEmailSchema>;

export type CreateContactPayload = {
  phoneNumber: string;
  email?: string;
};
