import { z } from 'zod';

import {
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const addressLine1Schema = z.string().min(2).max(50).brand<'AddressLine1'>();

const addressLine2Schema = z.string().min(2).max(50).brand<'AddressLine2'>();
const maybeAddressLine2Schema = addressLine2Schema.optional();

const addressLine3Schema = z.string().min(2).max(50).brand<'AddressLine3'>();
const maybeAddressLine3Schema = addressLine3Schema.optional();

const addressPostcodeSchema = z
  .string()
  .min(2)
  .max(50)
  .brand<'AddressPostcode'>();

const addressCitySchema = z.string().min(2).max(50).brand<'AddressCity'>();
const maybeAddressCitySchema = addressCitySchema.optional();

const addressStateSchema = z.string().min(2).max(50).brand<'AddressState'>();

const addressCountrySchema = z
  .string()
  .min(2)
  .max(50)
  .brand<'AddressCountry'>();

export const assertAddressLine1Valid: Validate<typeof addressLine1Schema> =
  domainSchemaValidatorBuilder(addressLine1Schema);

export const assertMaybeAddressLine2Valid: Validate<
  typeof maybeAddressLine2Schema
> = domainSchemaValidatorBuilder(maybeAddressLine2Schema);

export const assertMaybeAddressLine3Valid: Validate<
  typeof maybeAddressLine3Schema
> = domainSchemaValidatorBuilder(maybeAddressLine3Schema);

export const assertAddressPostcodeValid: Validate<
  typeof addressPostcodeSchema
> = domainSchemaValidatorBuilder(addressPostcodeSchema);

export const assertMaybeAddressCityValid: Validate<
  typeof maybeAddressCitySchema
> = domainSchemaValidatorBuilder(maybeAddressCitySchema);

export const assertAddressStateValid: Validate<typeof addressStateSchema> =
  domainSchemaValidatorBuilder(addressStateSchema);

export const assertAddressCountryValid: Validate<typeof addressCountrySchema> =
  domainSchemaValidatorBuilder(addressCountrySchema);

export type AddressLine1 = z.infer<typeof addressLine1Schema>;

export type AddressLine2 = z.infer<typeof addressLine2Schema>;

export type AddressLine3 = z.infer<typeof addressLine3Schema>;

export type AddressPostcode = z.infer<typeof addressPostcodeSchema>;

export type AddressCity = z.infer<typeof addressCitySchema>;

export type AddressState = z.infer<typeof addressStateSchema>;

export type AddressCountry = z.infer<typeof addressCountrySchema>;

export type CreateAddressPayload = {
  line1: string;
  line2?: string;
  line3?: string;
  postcode: string;
  city?: string;
  state: string;
  country: string;
};
