import { z } from 'zod';

export const AddressLine1 = z.string().min(2).max(50).brand<'AddressLine1'>();
export type AddressLine1 = z.infer<typeof AddressLine1>;

export const AddressLine2 = z.string().min(2).max(50).brand<'AddressLine2'>();
export type AddressLine2 = z.infer<typeof AddressLine2>;

export const AddressLine3 = z.string().min(2).max(50).brand<'AddressLine3'>();
export type AddressLine3 = z.infer<typeof AddressLine3>;

export const AddressPostcode = z
  .string()
  .min(2)
  .max(50)
  .brand<'AddressPostcode'>();
export type AddressPostcode = z.infer<typeof AddressPostcode>;

export const AddressCity = z.string().min(2).max(50).brand<'AddressCity'>();
export type AddressCity = z.infer<typeof AddressCity>;

export const AddressState = z.string().min(2).max(50).brand<'AddressState'>();
export type AddressState = z.infer<typeof AddressState>;

export const AddressCountry = z
  .string()
  .min(2)
  .max(50)
  .brand<'AddressCountry'>();
export type AddressCountry = z.infer<typeof AddressCountry>;

export type CreateAddressPayload = {
  line1: string;
  line2?: string;
  line3?: string;
  postcode: string;
  city?: string;
  state: string;
  country: string;
};
